import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe } from "@/lib/server/db";
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

  if (!(await connectDBSafe())) {
    return json({ conversations: [], page, limit, total: 0, totalPages: 1 });
  }

  const skip = (page - 1) * limit;
  const [conversations, total] = await Promise.all([
    ConversationModel.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title createdAt updatedAt messages")
      .lean(),
    ConversationModel.countDocuments(),
  ]);

  return json({
    conversations: conversations.map((c) => ({
      id: String(c._id),
      title: c.title,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      messageCount: (c.messages ?? []).length,
    })),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
}
