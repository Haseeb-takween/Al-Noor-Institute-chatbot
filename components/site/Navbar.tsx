"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, courses } from "@/lib/site-data";
import { Logo, Icon, ArrowRight, Menu, Close, Chevron } from "./Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-line shadow-[0_1px_20px_rgba(10,31,68,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
          <Logo className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-45 sm:h-9 sm:w-9" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-[0.95rem] font-semibold text-ink sm:text-[1.15rem]">
              Al-Noor <span className="text-gold-grad">Institute</span>
            </span>
            <span className="mt-0.5 hidden text-[0.62rem] uppercase tracking-[0.2em] text-muted sm:block">
              Online Islamic Education
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isCourses = link.label === "Courses";
            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => isCourses && setCoursesOpen(true)}
                onMouseLeave={() => isCourses && setCoursesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-ink/80 transition-colors hover:text-gold-deep"
                >
                  {link.label}
                  {isCourses && (
                    <Chevron
                      className={`h-3.5 w-3.5 text-muted transition-transform duration-300 ${
                        coursesOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  <span className="pointer-events-none absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                </Link>

                {isCourses && (
                  <div
                    className={`absolute left-1/2 top-[calc(100%+10px)] w-[560px] -translate-x-1/2 transition-all duration-300 ${
                      coursesOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-[0_24px_60px_rgba(10,31,68,0.16)]">
                      <div className="grid grid-cols-2 gap-1.5">
                        {courses.map((c) => (
                          <Link
                            key={c.id}
                            href="/#courses"
                            className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper"
                          >
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover/item:bg-gold/15 group-hover/item:text-gold-deep">
                              <Icon name={c.icon} className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-[0.86rem] font-semibold text-ink">
                                {c.name}
                              </span>
                              <span className="text-[0.75rem] text-muted">
                                {c.duration} · {c.price}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/enrol"
                        className="mt-1.5 flex items-center justify-between rounded-xl bg-navy px-4 py-3 text-white transition-colors hover:bg-navy-soft"
                      >
                        <span className="text-[0.85rem] font-medium">
                          Book a free trial class — no obligation
                        </span>
                        <ArrowRight className="h-4 w-4 text-gold-bright" />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          {/* Wrapper hides Enrol when hamburger shows — .btn sets display and overrides Tailwind `hidden`. */}
          <div className="hidden lg:block">
            <Link href="/enrol" className="btn btn-gold text-[0.85rem]">
              Enrol Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-line bg-white lg:hidden transition-[max-height,opacity] duration-[400ms] ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-[0.98rem] font-medium text-ink transition-colors hover:bg-paper"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-muted" />
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href="/enrol"
              className="btn btn-gold w-full"
              onClick={() => setMobileOpen(false)}
            >
              Enrol Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
