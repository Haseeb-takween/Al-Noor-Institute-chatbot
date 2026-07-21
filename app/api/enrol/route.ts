import { connectDBSafe, isDbConfigured } from "@/lib/server/db";
import { EnrolmentModel } from "@/lib/server/models";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

const COURSES = new Set([
  "Quran Recitation & Tajweed",
  "Arabic Language",
  "Islamic Studies",
  "Seerah — Life of the Prophet ﷺ",
  "Hifz (Memorisation) Support",
]);

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v : "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const course = clean(body.course);
  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const isChild = Boolean(body.isChild);

  if (!course || !COURSES.has(course)) return fail("Please choose a valid course.", 400);
  if (!fullName) return fail("Your full name is required.", 400);
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail("A valid email address is required.", 400);
  if (!phone) return fail("A contact phone number is required.", 400);

  const teacherPreference = ["either", "male", "female"].includes(String(body.teacherPreference))
    ? (body.teacherPreference as string)
    : "either";

  const record = {
    course,
    level: clean(body.level, 60),
    fullName,
    email,
    phone,
    studentName: clean(body.studentName, 120),
    studentAge: clean(body.studentAge, 20),
    isChild,
    preferredTime: clean(body.preferredTime, 60),
    teacherPreference,
    notes: clean(body.notes, 1000),
  };

  if (isDbConfigured() && (await connectDBSafe())) {
    try {
      const saved = await EnrolmentModel.create(record);
      return json({ ok: true, id: saved._id.toString() }, 201);
    } catch (err) {
      console.error("Enrolment save error:", err);
      return fail("We couldn't save your request. Please try again or call 0800 123 4567.", 502);
    }
  }

  console.log("Enrolment request (not persisted — no DB):", record);
  return json({ ok: true, id: null }, 201);
}
