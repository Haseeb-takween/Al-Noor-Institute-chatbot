"use client";

import Link from "next/link";
import { Logo } from "@/components/site/Icons";

export function AdminHeader({
  onLogout,
  active,
}: {
  onLogout: () => void;
  active: "conversations" | "enrolments";
}) {
  const tab = (href: string, key: string, label: string) => (
    <Link
      href={href}
      className={`rounded-full px-3.5 py-1.5 text-[0.85rem] font-medium transition-colors ${
        active === key ? "bg-navy text-white" : "text-body hover:text-gold-deep"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] font-semibold text-ink">Al-Noor Admin</span>
            <span className="mt-0.5 hidden text-[0.62rem] uppercase tracking-[0.18em] text-muted sm:block">
              Institute dashboard
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {tab("/admin", "conversations", "Conversations")}
          {tab("/admin/enrolments", "enrolments", "Enrolments")}
          <button
            type="button"
            onClick={onLogout}
            className="ml-2 rounded-full border border-line-strong px-4 py-1.5 text-[0.82rem] font-medium text-body transition-colors hover:border-red-300 hover:text-red-600"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
