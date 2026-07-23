import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type LegalPageProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="bg-paper pt-[68px]">
        <div className="border-b border-line bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-16">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
              Legal
            </p>
            <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{title}</h1>
            <p className="mt-3 text-[0.9rem] text-muted">Last updated: {updated}</p>
            <p className="mt-2 text-[0.85rem] text-muted">
              <Link href="/" className="text-navy underline-offset-2 hover:underline">
                Home
              </Link>
              <span className="mx-2 text-line-strong">/</span>
              {title}
            </p>
          </div>
        </div>
        <article className="legal-prose mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl text-ink sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-body">{children}</div>
    </section>
  );
}
