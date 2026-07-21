import { isAdminRequest } from "@/lib/server/auth";
import { connectDBSafe, isDbConfigured } from "@/lib/server/db";
import { EnrolmentModel } from "@/lib/server/models";
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

  if (!(await connectDBSafe())) {
    return fail(
      "MongoDB unreachable (often Atlas Network Access). Allow 0.0.0.0/0 so admin can load data.",
      503,
    );
  }

  const enrolments = await EnrolmentModel.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .select(
      "course level fullName email phone studentName studentAge isChild preferredTime teacherPreference notes status createdAt",
    )
    .lean();

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
