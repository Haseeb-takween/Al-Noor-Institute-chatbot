import dynamic from "next/dynamic";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SectionSkeleton } from "@/components/site/Skeleton";

/* Eager: first viewport. Lazy: below-fold sections — smaller initial JS. */
const Stats = dynamic(
  () => import("@/components/site/Stats").then((m) => m.Stats),
  { loading: () => <SectionSkeleton /> },
);
const About = dynamic(
  () => import("@/components/site/About").then((m) => m.About),
  { loading: () => <SectionSkeleton /> },
);
const Courses = dynamic(
  () => import("@/components/site/Courses").then((m) => m.Courses),
  { loading: () => <SectionSkeleton tall /> },
);
const Features = dynamic(
  () => import("@/components/site/Features").then((m) => m.Features),
  { loading: () => <SectionSkeleton /> },
);
const HowItWorks = dynamic(
  () => import("@/components/site/HowItWorks").then((m) => m.HowItWorks),
  { loading: () => <SectionSkeleton /> },
);
const Teachers = dynamic(
  () => import("@/components/site/Teachers").then((m) => m.Teachers),
  { loading: () => <SectionSkeleton /> },
);
const Pricing = dynamic(
  () => import("@/components/site/Pricing").then((m) => m.Pricing),
  { loading: () => <SectionSkeleton /> },
);
const Faq = dynamic(
  () => import("@/components/site/Faq").then((m) => m.Faq),
  { loading: () => <SectionSkeleton /> },
);
const Footer = dynamic(
  () => import("@/components/site/Footer").then((m) => m.Footer),
  { loading: () => <SectionSkeleton /> },
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Courses />
        <Features />
        <HowItWorks />
        <Teachers />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
