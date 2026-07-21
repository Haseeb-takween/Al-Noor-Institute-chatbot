import { Logo, Icon, ArrowRight, Check, Sparkle } from "./Icons";
import { Reveal } from "./Reveal";

const trust = ["Ijazah-qualified teachers", "One free trial class", "UK-registered"];

const floatChips = [
  { icon: "quran" as const, label: "Quran & Tajweed", sub: "from £30/mo", cls: "top-6 -left-4 animate-floaty" },
  { icon: "arabic" as const, label: "Arabic Language", sub: "6-month levels", cls: "bottom-24 -left-8 animate-floaty-slow" },
  { icon: "hifz" as const, label: "Hifz Support", sub: "your pace", cls: "bottom-6 right-2 animate-floaty" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-[68px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[420px] w-[420px] rounded-full bg-navy/5 blur-[110px]" />
        <div className="pattern-geo absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/8 px-3.5 py-1.5 text-[0.78rem] font-medium text-gold-deep">
              <Sparkle className="h-3.5 w-3.5" />
              Learning that honours the tradition
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.05] sm:text-5xl md:text-[3.5rem]">
              Sacred knowledge,
              <br />
              <span className="italic text-gold-grad">taught with care.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-body">
              Al-Noor Institute is a UK-based online provider of Quran &amp;
              Tajweed, Arabic, Islamic Studies, Seerah and Hifz — delivered live
              by qualified teachers, in small groups, seven days a week. Begin
              with one free trial class.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/enrol" className="btn btn-gold">
                Book a free trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#courses" className="btn btn-ghost">
                Explore courses
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[0.9rem] text-body">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="relative aspect-square">
            <div className="animate-spin-slow absolute inset-0 rounded-[2.5rem] pattern-geo opacity-70" />
            <div className="absolute inset-6 flex flex-col items-center justify-center rounded-[2.2rem] bg-gradient-to-br from-navy to-navy-deep text-center shadow-[0_40px_90px_rgba(10,31,68,0.35)]">
              <div className="pattern-dots-navy absolute inset-0 rounded-[2.2rem] opacity-60" />
              <Logo className="relative h-16 w-16" />
              <p className="relative mt-5 font-display text-2xl text-white">Al-Noor Institute</p>
              <p className="relative mt-1 text-[0.8rem] tracking-wide text-on-navy-muted">
                نور العلم · The light of knowledge
              </p>
              <div className="relative mt-6 flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.78rem] text-on-navy">
                <span className="animate-pulse-ring inline-flex h-2 w-2 rounded-full bg-gold-bright" />
                Live classes · 7 days a week
              </div>
            </div>

            {floatChips.map((chip) => (
              <div
                key={chip.label}
                className={`absolute ${chip.cls} flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(10,31,68,0.14)] backdrop-blur`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/12 text-gold-deep">
                  <Icon name={chip.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.8rem] font-semibold text-ink">{chip.label}</span>
                  <span className="text-[0.7rem] text-muted">{chip.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
