import { isDbConfigured, connectDBSafe } from "@/lib/server/db";
import { json } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET() {
  const db = !isDbConfigured()
    ? "not_configured"
    : (await connectDBSafe())
      ? "ok"
      : "disconnected";

  return json({
    status: "ok",
    db,
    ai:
      process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
        ? "configured"
        : "not_configured",
    time: new Date().toISOString(),
  });
}
