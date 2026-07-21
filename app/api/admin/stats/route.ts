import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe } from "@/lib/server/db";
import { ConversationModel, EnrolmentModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return fail("Admin authentication required", 401);
  if (!(await connectDBSafe()))
    return json({ totalConversations: 0, totalMessages: 0, totalEnrolments: 0 });

  const [totalConversations, messageAgg, totalEnrolments] = await Promise.all([
    ConversationModel.countDocuments(),
    ConversationModel.aggregate<{ totalMessages: number }>([
      { $project: { messageCount: { $size: "$messages" } } },
      { $group: { _id: null, totalMessages: { $sum: "$messageCount" } } },
    ]),
    EnrolmentModel.countDocuments(),
  ]);

  return json({
    totalConversations,
    totalMessages: messageAgg[0]?.totalMessages ?? 0,
    totalEnrolments,
  });
}
