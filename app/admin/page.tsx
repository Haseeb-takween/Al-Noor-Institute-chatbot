"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AdminRequestError,
  adminLogout,
  clearAdminToken,
  fetchAdminConversations,
  fetchAdminStats,
  getAdminToken,
  type AdminConversationSummary,
  type AdminStats,
} from "@/lib/admin";
import { Chat } from "@/components/site/Icons";
import { AdminHeader } from "@/components/admin/AdminHeader";

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [conversations, setConversations] = useState<AdminConversationSummary[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    let cancelled = false;

    void (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [statsData, conversationsData] = await Promise.all([
          fetchAdminStats(),
          fetchAdminConversations(page),
        ]);
        if (cancelled) return;
        setStats(statsData);
        setConversations(conversationsData.conversations);
        setTotalPages(conversationsData.totalPages);
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
  }, [page, router]);

  function handleLogout() {
    adminLogout();
    router.replace("/admin/login");
  }

  const statCards = [
    { label: "Conversations", value: stats?.totalConversations },
    { label: "Messages", value: stats?.totalMessages },
    { label: "Enrolments", value: stats?.totalEnrolments },
  ];

  return (
    <main className="min-h-dvh bg-paper">
      <AdminHeader onLogout={handleLogout} active="conversations" />

      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="card p-6">
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-gold-deep">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                {s.value ?? "—"}
              </p>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line px-5 py-4">
            <Chat className="h-5 w-5 text-gold-deep" />
            <h2 className="text-[1rem] font-semibold text-ink">Recent conversations</h2>
          </div>
          {isLoading ? (
            <p className="px-5 py-8 text-[0.9rem] text-muted">Loading…</p>
          ) : conversations.length === 0 ? (
            <p className="px-5 py-8 text-[0.9rem] text-muted">No conversations yet.</p>
          ) : (
            <ul className="flex flex-col">
              {conversations.map((c) => (
                <li key={c.id} className="border-b border-line last:border-b-0">
                  <Link
                    href={`/admin/conversations/${c.id}`}
                    className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-paper sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="truncate pr-4 text-[0.94rem] font-medium text-ink">
                      {c.title || "Untitled conversation"}
                    </span>
                    <span className="shrink-0 text-[0.8rem] text-muted">
                      {c.messageCount} msgs · {formatDate(c.updatedAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between text-[0.85rem] text-body">
          <button
            type="button"
            onClick={() => setPage((c) => c - 1)}
            disabled={page <= 1 || isLoading}
            className="rounded-full border border-line-strong px-4 py-1.5 transition-colors hover:border-gold hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-muted">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((c) => c + 1)}
            disabled={page >= totalPages || isLoading}
            className="rounded-full border border-line-strong px-4 py-1.5 transition-colors hover:border-gold hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}
