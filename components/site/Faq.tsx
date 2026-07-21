"use client";

import { useState } from "react";
import { faqs } from "@/lib/site-data";
import { Plus } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-0 bg-white pt-20 pb-20 lg:pt-28 lg:pb-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="flex flex-col items-center">
          <SectionHeading
            align="center"
            eyebrow="Questions & Answers"
            title={<>Everything you might be wondering</>}
            intro="Still unsure about something? Our assistant in the corner can help, or contact us directly."
          />
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={(i % 4) * 60}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    isOpen ? "border-gold/50 shadow-[var(--shadow-md)]" : "border-line"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[1rem] font-semibold transition-colors ${
                        isOpen ? "text-gold-deep" : "text-ink"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-gold bg-gold/15 text-gold-deep"
                          : "border-line-strong text-muted"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-[400ms] ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[0.94rem] leading-relaxed text-body">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
