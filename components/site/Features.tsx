import { features } from "@/lib/site-data";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Features() {
  return (
    <section className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why Al-Noor"
          title={<>Thoughtful teaching, in every detail</>}
          intro="Small classes, qualified teachers and flexible times — the things that make online learning actually work."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="card card-hover group h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/12 text-gold-deep transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg text-ink">{f.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-body">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
