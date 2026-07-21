import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Courses } from "@/components/site/Courses";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Teachers } from "@/components/site/Teachers";
import { Pricing } from "@/components/site/Pricing";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";

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
