import { qualityPoints, schedule } from "@/lib/site-data";
import { Icon, Check } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Teachers() {
  return (
    <section
      id="teachers"
      className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep py-20 text-white lg:py-28"
    >
      <div className="pattern-dots-navy absolute inset-0 opacity-40" />
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pattern-geo absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              onNavy
              eyebrow="Teachers & Quality"
              title={
                <>
                  Taught by teachers
                  <br />
                  <span className="italic text-gold-grad">who are qualified to teach</span>
                </>
              }
              intro="Quran and Tajweed teachers hold an Ijazah. Arabic teachers hold degrees in Arabic or Islamic studies. Every teacher passes a background check before joining."
            />

            <div className="mt-9 flex flex-col gap-4">
              {qualityPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 110}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold-bright">
                      <Icon name={p.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-white">{p.title}</h3>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-on-navy-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={150}>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
              <span className="eyebrow text-gold-bright">Schedule &amp; delivery</span>
              <h3 className="mt-3 text-2xl text-white">Live on Zoom, seven days a week</h3>
              <p className="mt-2 text-[0.92rem] text-on-navy-muted">
                Join from a laptop, tablet or phone. Joining instructions arrive
                before your first class.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {schedule.map((s) => (
                  <div
                    key={s.period}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Icon name="schedule" className="h-5 w-5 text-gold-bright" />
                      <span className="text-[0.92rem] font-medium text-white">{s.period}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[0.92rem] font-semibold text-white">{s.time}</div>
                      <div className="text-[0.72rem] text-on-navy-muted">{s.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["45-min standard classes", "Max six per group", "One-to-one available", "Free makeup with notice"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-2 text-[0.84rem] text-on-navy">
                      <Check className="h-4 w-4 text-gold-bright" />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
