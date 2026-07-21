"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AdminRequestError,
  clearAdminToken,
  fetchAdminConversation,
  getAdminToken,
  type AdminConversationDetail,
} from "@/lib/admin";
import { Logo } from "@/components/site/Icons";

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

export default function AdminConversationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [conversation, setConversation] = useState<AdminConversationDetail | null>(null);
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
        const data = await fetchAdminConversation(params.id);
        if (cancelled) return;
        setConversation(data);
      } catch (err: unknown) {
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
  }, [params.id, router]);

  return (
    <main className="min-h-dvh bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[0.88rem] font-medium text-body transition-colors hover:text-gold-deep"
          >
            ← Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-display text-[0.95rem] font-semibold text-ink">Al-Noor Admin</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8">
        {conversation && (
          <div className="mb-6">
            <h1 className="text-2xl">{conversation.title || "Untitled conversation"}</h1>
            <p className="mt-1 text-[0.82rem] text-muted">
              Created {formatDate(conversation.createdAt)} · Updated {formatDate(conversation.updatedAt)}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <p className="text-[0.9rem] text-muted">Loading…</p>
        ) : conversation && conversation.messages.length === 0 ? (
          <p className="text-[0.9rem] text-muted">No messages in this conversation.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {conversation?.messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-navy px-4 py-3 text-[0.92rem] leading-relaxed text-white">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-start">
                  <div className="chat-md max-w-[85%] rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3 text-[0.92rem] leading-relaxed text-body shadow-[var(--shadow-sm)]">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </main>
  );
}
