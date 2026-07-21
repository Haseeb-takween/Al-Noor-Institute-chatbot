import { institute } from "@/lib/site-data";
import { Icon, Check } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: "studies" as const,
    title: "Faithful to the tradition",
    body: "Curricula rooted in classical Islamic scholarship, taught by teachers who carry the qualifications to teach them.",
  },
  {
    icon: "device" as const,
    title: "Fully online, wherever you are",
    body: "Al-Noor is delivered entirely online — no physical campus, no travel. Learn from home across the UK and beyond.",
  },
  {
    icon: "family" as const,
    title: "For every age",
    body: "Dedicated pathways for children aged five and up, and for adults with no upper age limit — beginners always welcome.",
  },
];

const facts = [
  ["Type", institute.type],
  ["Location", "Registered in the United Kingdom · fully online"],
  ["Languages", institute.languages],
  ["Registered", "Yes — a UK-registered provider"],
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="About the Institute"
              title={
                <>
                  A place of light for
                  <br />
                  <span className="italic text-gold-grad">online Islamic learning</span>
                </>
              }
              intro="Al-Noor Institute exists to make authentic Islamic education accessible, warm and unintimidating — whether you are opening the Quran for the first time or deepening years of study. Every class is live, personal and taught by someone qualified to teach it."
            />

            <Reveal delay={120}>
              <dl className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-white px-5 py-4">
                    <dt className="text-[0.72rem] uppercase tracking-[0.16em] text-gold-deep">{k}</dt>
                    <dd className="mt-1 text-[0.92rem] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <div className="card card-hover flex items-start gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold-bright">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-[0.94rem] leading-relaxed text-body">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={330}>
              <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/8 px-5 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-[0.9rem] text-ink">
                  Not sure where to start? Your teacher assesses your level in the
                  free trial and places you in the right group.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
