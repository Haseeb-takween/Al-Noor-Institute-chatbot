import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/server/prompt";
import { connectDBSafe } from "@/lib/server/db";
import { ConversationModel } from "@/lib/server/models";
import { isValidObjectId } from "@/lib/server/http";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LEN = 8000;
const MAX_HISTORY = 40;

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

  const dbReady = await connectDBSafe();
  let conversationId: string | null =
    typeof body.conversationId === "string" ? body.conversationId : null;
  let conversationDoc: InstanceType<typeof ConversationModel> | null = null;

  if (dbReady) {
    try {
      if (conversationId && isValidObjectId(conversationId)) {
        conversationDoc = await ConversationModel.findById(conversationId);
      }
      if (!conversationDoc) {
        const firstUser = messages.find((m) => m.role === "user");
        conversationDoc = new ConversationModel({
          title: makeTitle(firstUser?.content ?? "New conversation"),
          messages: [],
        });
      }
      conversationId = conversationDoc._id.toString();
    } catch (err) {
      console.error("Conversation load error:", err);
      conversationDoc = null;
    }
  }

  const headers: Record<string, string> = {};
  if (conversationId) headers["X-Conversation-Id"] = conversationId;

  try {
    const result = streamText({
      model: google(MODEL),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.4,
      async onFinish({ text }) {
        if (!conversationDoc || !text) return;
        try {
          const now = new Date();
          conversationDoc.set("messages", [
            ...messages.map((m) => ({ role: m.role, content: m.content, timestamp: now })),
            { role: "assistant", content: text, timestamp: new Date() },
          ]);
          await conversationDoc.save();
        } catch (err) {
          console.error("Conversation save error:", err);
        }
      },
    });

    return result.toTextStreamResponse({ headers });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      "The assistant is temporarily unavailable. Please try again shortly, or contact Al-Noor Institute at info@alnoorinstitute.co.uk or 0800 123 4567.",
      { status: 502 },
    );
  }
}
