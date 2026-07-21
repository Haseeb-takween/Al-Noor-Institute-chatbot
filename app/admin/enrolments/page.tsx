"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AdminRequestError,
  adminLogout,
  clearAdminToken,
  fetchAdminEnrolments,
  getAdminToken,
  type AdminEnrolment,
} from "@/lib/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

const prefLabel: Record<string, string> = {
  either: "No preference",
  male: "Male teacher",
  female: "Female teacher",
};

export default function AdminEnrolmentsPage() {
  const router = useRouter();
  const [enrolments, setEnrolments] = useState<AdminEnrolment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    let cancelled = false;

    void (async () => {
      try {
        const data = await fetchAdminEnrolments();
        if (!cancelled) setEnrolments(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof AdminRequestError && err.unauthorized) {
          clearAdminToken();
          router.replace("/admin/login");
          return;
        }
        setError(
          err instanceof AdminRequestError ? err.message : "Something went wrong. Please try again.",
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="min-h-dvh bg-paper">
      <AdminHeader
        onLogout={() => {
          adminLogout();
          router.replace("/admin/login");
        }}
        active="enrolments"
      />

      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl">Enrolment requests</h1>
            <p className="mt-1 text-[0.88rem] text-muted">
              {isLoading ? "Loading…" : `${enrolments.length} total`}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
            {error}
          </div>
        )}

        {!isLoading && enrolments.length === 0 && !error && (
          <div className="card p-10 text-center">
            <p className="text-[0.95rem] text-body">No enrolment requests yet.</p>
            <p className="mt-1 text-[0.82rem] text-muted">
              New submissions from the enrolment form will appear here (requires MONGODB_URI).
            </p>
          </div>
        )}

        {enrolments.length > 0 && (
          <div className="flex flex-col gap-3">
            {enrolments.map((e) => (
              <div key={e.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[1rem] font-semibold text-ink">{e.fullName}</span>
                      {e.isChild && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.68rem] font-medium text-gold-deep">
                          For a child
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[0.84rem] text-body">
                      <a href={`mailto:${e.email}`} className="hover:text-gold-deep">{e.email}</a>
                      <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="hover:text-gold-deep">{e.phone}</a>
                    </div>
                  </div>
                  <span className="text-[0.76rem] text-muted">{formatDate(e.createdAt)}</span>
                </div>

                <div className="mt-4 grid gap-x-6 gap-y-2 border-t border-line pt-4 text-[0.84rem] sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Course" value={e.course} />
                  <Detail label="Level" value={e.level || "—"} />
                  <Detail label="Preferred time" value={e.preferredTime || "—"} />
                  {e.isChild && (
                    <Detail
                      label="Student"
                      value={`${e.studentName || "—"}${e.studentAge ? ` · age ${e.studentAge}` : ""}`}
                    />
                  )}
                  <Detail label="Teacher" value={prefLabel[e.teacherPreference] ?? e.teacherPreference} />
                  <Detail label="Status" value={e.status} />
                </div>

                {e.notes && (
                  <p className="mt-3 rounded-lg bg-paper px-3.5 py-2.5 text-[0.85rem] text-body">
                    <span className="font-medium text-ink">Notes: </span>
                    {e.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[0.68rem] uppercase tracking-[0.12em] text-gold-deep">{label}</span>
      <span className="mt-0.5 block text-ink">{value}</span>
    </div>
  );
}
