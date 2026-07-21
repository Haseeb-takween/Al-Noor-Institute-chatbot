import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { FULL_SYSTEM_PROMPT } from "@/lib/server/prompt";
import { isValidObjectId } from "@/lib/server/http";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Fast flash model — good latency for chat UX on localhost and Vercel. */
const MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY = 20;

type ChatMessage = { role: "user" | "assistant"; content: string };

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY ?? "",
});

function sanitize(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string",
    )
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_MESSAGE_LEN) }))
    .slice(-MAX_HISTORY);
}

function makeTitle(message: string): string {
  const trimmed = message.trim().replace(/\s+/g, " ");
  return trimmed.length > 50 ? `${trimmed.slice(0, 50)}...` : trimmed;
}

/** 24-char hex ObjectId without importing mongoose on the hot path. */
function newObjectIdHex(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Persist after the stream — never blocks first tokens. Lazy-imports DB. */
function persistTranscript(
  conversationId: string,
  messages: ChatMessage[],
  assistantText: string,
): void {
  if (!process.env.MONGODB_URI || !assistantText) return;

  void (async () => {
    try {
      const { connectDBQuick } = await import("@/lib/server/db");
      const { ConversationModel } = await import("@/lib/server/models");

      const ready = await connectDBQuick(3_000);
      if (!ready) {
        console.warn("Skip chat persist — Mongo not ready in time");
        return;
      }

      const now = new Date();
      const firstUser = messages.find((m) => m.role === "user");
      await ConversationModel.findOneAndUpdate(
        { _id: conversationId },
        {
          $set: {
            title: makeTitle(firstUser?.content ?? "New conversation"),
            messages: [
              ...messages.map((m) => ({
                role: m.role,
                content: m.content,
                timestamp: now,
              })),
              { role: "assistant", content: assistantText, timestamp: new Date() },
            ],
          },
        },
        { upsert: true },
      );
    } catch (err) {
      console.error("Conversation save error:", err);
    }
  })();
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.GEMINI_API_KEY) {
    return new Response(
      "The chat service is not configured. Please contact the administrator.",
      { status: 503 },
    );
  }

  let body: { conversationId?: string | null; messages?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  let messages = sanitize(body.messages);
  if (messages.length === 0 && typeof body.message === "string") {
    messages = [{ role: "user", content: body.message.slice(0, MAX_MESSAGE_LEN) }];
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("A user message is required.", { status: 400 });
  }

  const conversationId =
    typeof body.conversationId === "string" && isValidObjectId(body.conversationId)
      ? body.conversationId
      : newObjectIdHex();

  try {
    const result = streamText({
      model: google(MODEL),
      system: FULL_SYSTEM_PROMPT,
      messages,
      temperature: 0.3,
      // Prefer short replies — faster completion, better UX.
      maxOutputTokens: 800,
      async onFinish({ text }) {
        // Fire-and-forget — do not await Mongo (was delaying stream end).
        persistTranscript(conversationId, messages, text);
      },
    });

    return result.toTextStreamResponse({
      headers: { "X-Conversation-Id": conversationId },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      "The assistant is temporarily unavailable. Please try again shortly, or contact Al-Noor Institute at info@alnoorinstitute.co.uk or 0800 123 4567.",
      { status: 502 },
    );
  }
}
