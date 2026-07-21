import Link from "next/link";
import { steps } from "@/lib/site-data";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function HowItWorks() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col items-center">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title={<>From curious to enrolled in four steps</>}
            intro="Enrolment takes about five minutes online, with confirmation within 24 hours on working days."
          />
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 110} className="relative">
                <div className="flex flex-col items-start">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white font-display text-lg font-semibold text-gold-deep shadow-[var(--shadow-sm)]">
                    {step.n}
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold" />
                  </span>
                  <h3 className="mt-5 text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-body">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link href="/enrol" className="btn btn-navy">
            Start with a free trial
            <ArrowRight className="h-4 w-4 text-gold-bright" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
