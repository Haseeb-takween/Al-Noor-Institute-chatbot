"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AdminRequestError, adminLogin } from "@/lib/admin";
import { Logo, ArrowRight } from "@/components/site/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await adminLogin(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(
        err instanceof AdminRequestError ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-paper px-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="pattern-geo absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <form onSubmit={handleSubmit} className="card relative w-full max-w-sm p-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-semibold text-ink">Al-Noor Institute</span>
        </Link>
        <h1 className="mt-6 text-2xl">Admin sign in</h1>
        <p className="mt-1 text-[0.88rem] text-body">Enter your admin credentials to continue.</p>

        <label className="mt-6 block text-[0.78rem] font-medium uppercase tracking-[0.1em] text-gold-deep">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.92rem] text-ink focus:border-gold/60 focus:outline-none"
        />

        <label className="mt-4 block text-[0.78rem] font-medium uppercase tracking-[0.1em] text-gold-deep">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.92rem] text-ink focus:border-gold/60 focus:outline-none"
        />

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-[0.85rem] text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="btn btn-gold mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? "Checking…" : "Log in"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>

        <Link
          href="/"
          className="mt-4 block text-center text-[0.82rem] text-muted transition-colors hover:text-gold-deep"
        >
          ← Back to website
        </Link>
      </form>
    </main>
  );
}
