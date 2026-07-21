import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe } from "@/lib/server/db";
import { ConversationModel, EnrolmentModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return fail("Admin authentication required", 401);
  if (!(await connectDBSafe()))
    return json({ totalConversations: 0, totalMessages: 0, totalEnrolments: 0 });

  // Count messages via $size without shipping message content over the wire.
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
  });
}
