import Link from "next/link";
import { courses, discounts } from "@/lib/site-data";
import { Icon, Check, ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Pricing() {
  return (
    <section id="fees" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col items-center">
          <SectionHeading
            align="center"
            eyebrow="Fees & Payment"
            title={<>Simple, honest pricing</>}
            intro="All prices include weekly sessions and learning materials. No registration fee — you only pay the course fee. Billed monthly by card through a secure portal."
          />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-sm)]">
              {courses.map((c, i) => (
                <div
                  key={c.id}
                  className={`group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-paper ${
                    i !== courses.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-gold/15 group-hover:text-gold-deep">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[0.98rem] font-semibold text-ink">{c.name}</div>
                      <div className="text-[0.8rem] text-muted">{c.duration}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-semibold text-ink">{c.price}</div>
                    <div className="text-[0.72rem] uppercase tracking-wide text-gold-deep">
                      {c.level.includes("→") ? "all levels" : c.level}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 bg-navy/[0.03] px-6 py-4 text-[0.85rem] text-body">
                <Icon name="refund" className="h-5 w-5 shrink-0 text-gold-deep" />
                Full refund within 7 days of enrolment. After that, cancel future
                months anytime — no penalty.
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {discounts.map((d, i) => (
              <Reveal key={d.label} delay={i * 100}>
                <div className="card card-hover flex items-center gap-5 p-6">
                  <span className="font-display text-3xl font-semibold text-gold-grad">{d.value}</span>
                  <div>
                    <div className="text-[0.98rem] font-semibold text-ink">{d.label}</div>
                    <div className="mt-0.5 text-[0.85rem] text-body">{d.note}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <div className="rounded-2xl bg-navy p-6 text-white shadow-[var(--shadow-md)]">
                <div className="flex items-center gap-2 text-gold-bright">
                  <Check className="h-4 w-4" />
                  <span className="text-[0.8rem] uppercase tracking-[0.14em]">Good to know</span>
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-on-navy-muted">
                  One-to-one classes are available for every subject at double the
                  group rate. Ask us to arrange it.
                </p>
                <Link
                  href="/#contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-gold-bright"
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
