import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe, isDbConfigured } from "@/lib/server/db";
import { ConversationModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return fail("Admin authentication required", 401);

  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(url.searchParams.get("limit") ?? "20", 10) || 20),
  );

  if (!isDbConfigured()) {
    return fail(
      "Database is not configured. Set MONGODB_URI on Vercel and redeploy.",
      503,
    );
  }

  if (!(await connectDBSafe())) {
    return fail(
      "MongoDB unreachable (often Atlas Network Access). Allow 0.0.0.0/0 so admin can load data.",
      503,
    );
  }

  const skip = (page - 1) * limit;

  // Project messageCount with $size — never pull full message bodies for the list.
  const [conversations, total] = await Promise.all([
    ConversationModel.aggregate<{
      _id: unknown;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      messageCount: number;
    }>([
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          createdAt: 1,
          updatedAt: 1,
          messageCount: { $size: { $ifNull: ["$messages", []] } },
        },
      },
    ]),
    ConversationModel.countDocuments(),
  ]);

  return json({
    conversations: conversations.map((c) => ({
      id: String(c._id),
      title: c.title,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      messageCount: c.messageCount,
    })),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
}
