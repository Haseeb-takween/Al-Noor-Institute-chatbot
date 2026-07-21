import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe } from "@/lib/server/db";
import { ConversationModel } from "@/lib/server/models";
import { json, fail, isValidObjectId } from "@/lib/server/http";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, ctx: Ctx) {
  if (!isAdminRequest(req)) return fail("Admin authentication required", 401);

  const { id } = await ctx.params;
  if (!(await connectDBSafe())) return fail("Conversation not found", 404);
  if (!isValidObjectId(id)) return fail("Conversation not found", 404);

  const c = await ConversationModel.findById(id).lean();
  if (!c) return fail("Conversation not found", 404);

  return json({
    id: String(c._id),
    title: c.title,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    messages: (c.messages ?? []).map((m) => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    })),
  });
}
