import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe } from "@/lib/server/db";
import { EnrolmentModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return fail("Admin authentication required", 401);
  if (!(await connectDBSafe())) return json({ enrolments: [] });

  const enrolments = await EnrolmentModel.find().sort({ createdAt: -1 }).limit(200).lean();

  return json({
    enrolments: enrolments.map((e) => ({
      id: String(e._id),
      course: e.course,
      level: e.level,
      fullName: e.fullName,
      email: e.email,
      phone: e.phone,
      studentName: e.studentName,
      studentAge: e.studentAge,
      isChild: e.isChild,
      preferredTime: e.preferredTime,
      teacherPreference: e.teacherPreference,
      notes: e.notes,
      status: e.status,
      createdAt: e.createdAt,
    })),
  });
}
