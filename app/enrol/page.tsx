"use client";

import { useState } from "react";
import Link from "next/link";
import { courses, institute } from "@/lib/site-data";
import { Navbar } from "@/components/site/Navbar";
import { Icon, Logo, Check, ArrowRight, Phone, Mail, Sparkle } from "@/components/site/Icons";

type Pref = "either" | "male" | "female";
type ForWhom = "self" | "child";

const times = ["Mornings (7am–12pm)", "Evenings (5pm–9pm)", "Weekends (9am–6pm)", "Flexible / not sure"];

export default function EnrolPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [forWhom, setForWhom] = useState<ForWhom>("self");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [preferredTime, setPreferredTime] = useState(times[0]);
  const [teacherPreference, setTeacherPreference] = useState<Pref>("either");
  const [notes, setNotes] = useState("");

  function step0Hint(): string | null {
    if (!course) return "Please select a programme to continue.";
    return null;
  }

  function step1Hint(): string | null {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
    if (!phone.trim()) return "Please enter a phone number.";
    if (forWhom === "child" && !studentName.trim()) return "Please enter your child's name.";
    return null;
  }

  function goNext() {
    setError(null);
    if (step === 0) {
      const hint = step0Hint();
      if (hint) {
        setError(hint);
        return;
      }
    }
    if (step === 1) {
      const hint = step1Hint();
      if (hint) {
        setError(hint);
        return;
      }
    }
    setStep((s) => s + 1);
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/enrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course,
          level,
          fullName,
          email,
          phone,
          isChild: forWhom === "child",
          studentName: forWhom === "child" ? studentName : "",
          studentAge: forWhom === "child" ? studentAge : "",
          preferredTime,
          teacherPreference,
          notes,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Something went wrong. Please try again.");
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-dvh overflow-hidden bg-paper pt-[68px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
          <div className="pattern-geo absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-5 py-12 lg:py-16">
          {step < 3 ? (
            <>
              <div className="text-center">
                <span className="eyebrow">Enrolment</span>
                <h1 className="mt-3 text-3xl sm:text-4xl">
                  Book your <span className="italic text-gold-grad">free trial class</span>
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-[0.98rem] text-body">
                  Takes about two minutes. There&apos;s no payment now and no obligation — we&apos;ll
                  confirm within 24 hours on working days.
                </p>
              </div>

              <Stepper step={step} />

              <div className="card mt-8 p-6 sm:p-8">
                {step === 0 && (
                  <Section title="Which programme are you interested in?">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {courses.map((c) => {
                        const active = course === c.name;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCourse(c.name)}
                            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                              active
                                ? "border-gold bg-gold/8 shadow-[var(--shadow-md)]"
                                : "border-line bg-white hover:border-gold/50"
                            }`}
                          >
                            <span
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                active ? "bg-navy text-gold-bright" : "bg-navy/5 text-navy"
                              }`}
                            >
                              <Icon name={c.icon} className="h-6 w-6" />
                            </span>
                            <span>
                              <span className="block text-[0.95rem] font-semibold text-ink">{c.name}</span>
                              <span className="mt-0.5 block text-[0.8rem] text-muted">
                                {c.duration} · {c.price}
                              </span>
                            </span>
                            {active && <Check className="ml-auto h-5 w-5 text-gold-deep" />}
                          </button>
                        );
                      })}
                    </div>

                    <Field label="Your current level" optional>
                      <div className="flex flex-wrap gap-2">
                        {["Complete beginner", "Beginner", "Intermediate", "Advanced", "Not sure"].map((l) => (
                          <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                            {l}
                          </Chip>
                        ))}
                      </div>
                    </Field>
                  </Section>
                )}

                {step === 1 && (
                  <Section title="Who is this enrolment for?">
                    <div className="grid grid-cols-2 gap-3">
                      {(["self", "child"] as ForWhom[]).map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setForWhom(w)}
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            forWhom === w ? "border-gold bg-gold/8" : "border-line bg-white hover:border-gold/50"
                          }`}
                        >
                          <span className="block text-[0.95rem] font-semibold text-ink">
                            {w === "self" ? "Myself" : "My child"}
                          </span>
                          <span className="mt-0.5 block text-[0.8rem] text-muted">
                            {w === "self" ? "An adult learner" : "Aged 5 and above"}
                          </span>
                        </button>
                      ))}
                    </div>

                    {forWhom === "child" && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Child's name" required>
                          <Input value={studentName} onChange={setStudentName} placeholder="Student's full name" />
                        </Field>
                        <Field label="Child's age" optional>
                          <Input value={studentAge} onChange={setStudentAge} placeholder="e.g. 8" />
                        </Field>
                      </div>
                    )}

                    <Field label={forWhom === "child" ? "Parent / guardian name" : "Full name"} required>
                      <Input value={fullName} onChange={setFullName} placeholder="Your full name" />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email address" required>
                        <Input value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
                      </Field>
                      <Field label="Phone number" required>
                        <Input value={phone} onChange={setPhone} placeholder="Mobile or landline" />
                      </Field>
                    </div>
                  </Section>
                )}

                {step === 2 && (
                  <Section title="A few preferences">
                    <Field label="Preferred class times" optional>
                      <div className="flex flex-wrap gap-2">
                        {times.map((t) => (
                          <Chip key={t} active={preferredTime === t} onClick={() => setPreferredTime(t)}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </Field>

                    <Field label="Teacher preference" optional>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            ["either", "No preference"],
                            ["male", "Male teacher"],
                            ["female", "Female teacher"],
                          ] as [Pref, string][]
                        ).map(([val, lbl]) => (
                          <Chip key={val} active={teacherPreference === val} onClick={() => setTeacherPreference(val)}>
                            {lbl}
                          </Chip>
                        ))}
                      </div>
                    </Field>

                    <Field label="Anything else?" optional>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Questions, timing constraints, learning goals…"
                        className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-3 text-[0.92rem] text-ink placeholder:text-muted focus:border-gold/60 focus:outline-none"
                      />
                    </Field>

                    <div className="rounded-2xl border border-gold/30 bg-gold/8 p-4 text-[0.85rem] text-ink">
                      <span className="font-semibold">Summary:</span> {course || "—"} · {level}
                      {forWhom === "child" ? ` · for ${studentName || "your child"}` : ""}
                    </div>
                  </Section>
                )}

                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.88rem] text-red-700">
                    {error}
                  </div>
                )}

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={`btn btn-ghost ${step === 0 ? "pointer-events-none opacity-0" : ""}`}
                  >
                    Back
                  </button>

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="btn btn-gold"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      className="btn btn-gold disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Submitting…" : "Submit enrolment"}
                      {!submitting && <Check className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-6 text-center text-[0.82rem] text-muted">
                Prefer to talk? Call {institute.phone} ({institute.phoneHours}) or email {institute.email}.
              </p>
            </>
          ) : (
            <Success name={forWhom === "child" ? studentName || "your child" : fullName} course={course} />
          )}
        </div>

        <SlimFooter />
      </main>
    </>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Programme", "Your details", "Preferences"];
  return (
    <div className="mx-auto mt-8 flex max-w-md items-center">
      {labels.map((l, i) => (
        <div key={l} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[0.82rem] font-semibold transition-colors ${
                i <= step ? "bg-navy text-gold-bright" : "bg-white text-muted ring-1 ring-line"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className={`text-[0.7rem] ${i <= step ? "text-ink" : "text-muted"}`}>{l}</span>
          </div>
          {i < labels.length - 1 && (
            <span className={`mx-1 mb-5 h-px flex-1 ${i < step ? "bg-navy" : "bg-line"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl text-ink">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  required,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-gold-deep">
        {label}
        {required && <span className="text-red-600"> *</span>}
        {optional && <span className="normal-case tracking-normal text-muted"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.92rem] text-ink placeholder:text-muted focus:border-gold/60 focus:outline-none"
    />
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[0.85rem] transition-all ${
        active ? "border-gold bg-gold/12 text-gold-deep" : "border-line bg-white text-body hover:border-gold/50"
      }`}
    >
      {children}
    </button>
  );
}

function Success({ name, course }: { name: string; course: string }) {
  return (
    <div className="card mx-auto max-w-xl p-8 text-center sm:p-10">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
        <Check className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl">Request received</h1>
      <p className="mt-3 text-[1rem] text-body">
        Thank you{name ? `, we've noted this for ${name}` : ""}. Your interest in{" "}
        <span className="font-semibold text-ink">{course}</span> has been sent to Al-Noor Institute.
        We&apos;ll be in touch within 24 hours on working days to arrange your free trial class.
      </p>
      <div className="mt-5 flex flex-col items-center gap-2 text-[0.9rem] text-body">
        <span className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gold-deep" /> {institute.email}
        </span>
        <span className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gold-deep" /> {institute.phone}
        </span>
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-navy">
          Back to home
        </Link>
        <Link href="/#courses" className="btn btn-ghost">
          Browse courses
        </Link>
      </div>
      <p className="mt-6 flex items-center justify-center gap-1.5 text-[0.8rem] text-muted">
        <Sparkle className="h-3.5 w-3.5 text-gold-deep" />
        No payment is taken until after your free trial.
      </p>
    </div>
  );
}

function SlimFooter() {
  return (
    <footer className="relative border-t border-line bg-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-5 py-6 text-[0.82rem] text-muted sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="font-display font-semibold text-ink">Al-Noor Institute</span>
        </Link>
        <span>© {new Date().getFullYear()} · Fully online · United Kingdom</span>
      </div>
    </footer>
  );
}
