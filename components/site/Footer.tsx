import Link from "next/link";
import { institute, navLinks, courses } from "@/lib/site-data";
import { Logo, Mail, Phone, ArrowRight, Sparkle, Lock as LockIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-navy-deep text-on-navy">
      {/* CTA band */}
      <div className="mx-auto max-w-6xl px-5 pt-16 lg:px-8 lg:pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-deep via-gold to-gold-bright px-8 py-12 text-center shadow-[0_30px_70px_rgba(201,162,74,0.35)]">
            <div
              className="pattern-geo pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
              aria-hidden
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-navy-deep/20 px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#3a2a08]">
                <Sparkle className="h-3.5 w-3.5" />
                Your first class is free
              </span>
              <h2 className="mt-5 text-3xl text-[#2a1e05] sm:text-4xl">
                Begin your journey with Al-Noor
              </h2>
              <p className="mt-3 text-[1rem] text-[#4a3608]">
                Book a free trial, meet your teacher, and find your level — with
                no obligation to continue.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/enrol" className="btn bg-navy text-white hover:bg-navy-soft">
                  Enrol now
                  <ArrowRight className="h-4 w-4 text-gold-bright" />
                </Link>
                <a
                  href={`tel:${institute.phone.replace(/\s/g, "")}`}
                  className="btn bg-white/85 text-navy hover:bg-white"
                >
                  <Phone className="h-4 w-4" />
                  {institute.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* main footer */}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-semibold text-white">Al-Noor Institute</span>
          </Link>
          <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed text-on-navy-muted">
            A UK-based online Islamic education provider. Quran, Arabic, Islamic
            Studies, Seerah and Hifz — taught live with care.
          </p>
        </div>

        <div>
          <h4 className="text-[0.78rem] uppercase tracking-[0.16em] text-gold-bright">Explore</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[0.9rem] text-on-navy-muted transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.78rem] uppercase tracking-[0.16em] text-gold-bright">Courses</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {courses.map((c) => (
              <li key={c.id}>
                <Link
                  href="/#courses"
                  className="text-[0.9rem] text-on-navy-muted transition-colors hover:text-white"
                >
                  {c.name.replace(" — Life of the Prophet ﷺ", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.78rem] uppercase tracking-[0.16em] text-gold-bright">Get in touch</h4>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <a
                href={`mailto:${institute.email}`}
                className="flex items-center gap-2.5 text-[0.9rem] text-on-navy-muted transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-gold-bright" />
                {institute.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${institute.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-[0.9rem] text-on-navy-muted transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-gold-bright" />
                {institute.phone}
              </a>
            </li>
            <li className="text-[0.82rem] text-on-navy-muted">{institute.phoneHours}</li>
            <li className="text-[0.82rem] text-on-navy-muted">Fully online · United Kingdom</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-[0.8rem] text-on-navy-muted sm:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Al-Noor Institute. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[0.75rem] text-on-navy-muted transition-colors hover:border-gold-bright/50 hover:text-gold-bright"
            >
              <LockIcon className="h-3 w-3" />
              Staff sign in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
