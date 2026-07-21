import { connectDBSafe } from "@/lib/server/db";
import { ConversationModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET() {
  if (!(await connectDBSafe())) return json({ conversations: [] });

  const conversations = await ConversationModel.find()
    .sort({ updatedAt: -1 })
    .select("title createdAt updatedAt")
    .lean();

  return json({
    conversations: conversations.map((c) => ({
      id: String(c._id),
      title: c.title,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })),
  });
}

export async function POST() {
  if (!(await connectDBSafe())) return fail("Storage is not configured.", 503);

  const conversation = await ConversationModel.create({ title: "New conversation", messages: [] });

  return json(
    {
      id: conversation._id.toString(),
      title: conversation.title,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    },
    201,
  );
}
