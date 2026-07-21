import Link from "next/link";
import { courses } from "@/lib/site-data";
import { Icon, ArrowRight, Check } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Courses() {
  return (
    <section id="courses" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col items-center">
          <SectionHeading
            align="center"
            eyebrow="Our Programmes"
            title={<>Five paths of study</>}
            intro="Each programme runs live, in small groups of up to six, with weekly materials included. Begin at any level — no prior knowledge required."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <Reveal key={course.id} delay={(i % 3) * 90}>
              <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-7">
                <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold-bright">
                    <Icon name={course.icon} className="h-7 w-7" />
                  </span>
                  {course.arabic && (
                    <span className="font-display text-2xl text-gold/70">{course.arabic}</span>
                  )}
                </div>

                <h3 className="mt-5 text-xl leading-snug text-ink">{course.name}</h3>
                <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-body">{course.blurb}</p>

                <ul className="mt-5 flex flex-col gap-2">
                  {course.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[0.84rem] text-body">
                      <Check className="h-4 w-4 shrink-0 text-gold-deep" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                  <div className="flex flex-col">
                    <span className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                      {course.level}
                    </span>
                    <span className="mt-0.5 text-[0.8rem] text-muted">{course.duration}</span>
                  </div>
                  <span className="font-display text-lg font-semibold text-ink">{course.price}</span>
                </div>

                <Link
                  href="/#fees"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-gold-deep transition-colors hover:text-navy"
                >
                  View details
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}

          <Reveal delay={90}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-navy to-navy-deep p-7 text-white shadow-[0_24px_60px_rgba(10,31,68,0.28)]">
              <div className="pattern-dots-navy absolute inset-0 opacity-50" />
              <div className="relative">
                <span className="eyebrow text-gold-bright">Free trial</span>
                <h3 className="mt-3 text-2xl text-white">Try any course before you enrol</h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-on-navy-muted">
                  One free class, no obligation. Experience the teaching, meet
                  your teacher, and find your level.
                </p>
              </div>
              <Link href="/enrol" className="btn btn-gold relative mt-6 self-start">
                Book my free class
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
