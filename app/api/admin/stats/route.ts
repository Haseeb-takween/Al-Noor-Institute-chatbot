import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe, isDbConfigured } from "@/lib/server/db";
import { ConversationModel, EnrolmentModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return fail("Admin authentication required", 401);

  if (!isDbConfigured()) {
    return fail(
      "Database is not configured. Set MONGODB_URI on Vercel and redeploy.",
      503,
    );
  }

  // Fail fast (~2.5s) — don't hang admin when Atlas IP allowlist blocks Vercel.
  if (!(await connectDBSafe())) {
    return fail(
      "MongoDB unreachable (often Atlas Network Access). Allow 0.0.0.0/0, or your admin data won't load. Chat/enrol still work.",
      503,
    );
  }

  const [totalConversations, messageAgg, totalEnrolments] = await Promise.all([
    ConversationModel.estimatedDocumentCount(),
    ConversationModel.aggregate<{ totalMessages: number }>([
      { $group: { _id: null, totalMessages: { $sum: { $size: { $ifNull: ["$messages", []] } } } } },
    ]),
    EnrolmentModel.estimatedDocumentCount(),
  ]);

  return json({
    totalConversations,
    totalMessages: messageAgg[0]?.totalMessages ?? 0,
    totalEnrolments,
    db: "ok",
  });
}
