"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site-data";

function useCountUp(target: number, run: boolean, ms = 1100) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

function StatItem({ value, label, run }: { value: string; label: string; run: boolean }) {
  const numeric = /^\d+$/.test(value);
  const counted = useCountUp(numeric ? parseInt(value, 10) : 0, run);
  return (
    <div className="flex flex-col items-center gap-1 px-4 text-center">
      <span className="font-display text-4xl font-semibold text-white sm:text-5xl">
        {numeric ? counted : value}
      </span>
      <span className="text-[0.82rem] uppercase tracking-[0.14em] text-on-navy-muted">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative -mt-2 px-5 lg:px-8">
      <div
        ref={ref}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy to-navy-deep px-6 py-9 shadow-[0_30px_70px_rgba(10,31,68,0.28)]"
      >
        <div className="pattern-dots-navy absolute inset-0 opacity-50" />
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative grid grid-cols-2 gap-y-8 divide-white/10 sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
