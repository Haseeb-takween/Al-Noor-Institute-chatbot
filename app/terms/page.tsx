import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { institute } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms & Conditions — Al-Noor Institute",
  description:
    "Terms and conditions for using Al-Noor Institute’s website and enrolling in our online Islamic education courses.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="24 July 2026">
      <LegalSection title="1. Agreement">
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Al-Noor
          Institute website and our online education services. By using the site or enrolling in
          a course, you agree to these Terms. If you do not agree, please do not use our
          services.
        </p>
        <p>
          Al-Noor Institute is a UK-based online Islamic education provider. Contact:{" "}
          <a href={`mailto:${institute.email}`}>{institute.email}</a> ·{" "}
          <a href={`tel:${institute.phone.replace(/\s/g, "")}`}>{institute.phone}</a>.
        </p>
      </LegalSection>

      <LegalSection title="2. Our services">
        <p>
          We offer live online classes in Quran Recitation &amp; Tajweed, Arabic Language,
          Islamic Studies, Seerah, and Hifz Support. Classes are delivered via Zoom. A free
          trial class is available for new students before enrolment.
        </p>
        <p>
          Course details, durations, and fees shown on the website are for information and may
          be updated from time to time. The fee confirmed at enrolment applies to your booking.
        </p>
      </LegalSection>

      <LegalSection title="3. Eligibility and enrolment">
        <p>
          You must provide accurate information when enrolling. If you enrol a child (aged 5+),
          you confirm you are their parent or legal guardian and that you will supervise
          children under 10 during classes.
        </p>
        <p>
          Enrolment is confirmed when we accept your registration and (where applicable) payment
          arrangements are in place. We may decline or cancel an enrolment if information is
          incomplete or misleading, or if we cannot reasonably provide the requested service.
        </p>
      </LegalSection>

      <LegalSection title="4. Fees and payment">
        <p>
          Course fees are as published on our website unless otherwise agreed in writing. There
          is no separate registration fee. Monthly courses are billed monthly by card through
          our payment process. One-to-one sessions are charged at a higher rate than group
          classes.
        </p>
        <p>
          Discounts (such as family or advance-payment discounts) apply only when the stated
          conditions are met and may be withdrawn for future periods with notice.
        </p>
      </LegalSection>

      <LegalSection title="5. Refunds and cancellation">
        <p>
          You may cancel within 7 days of enrolment for a full refund. After 7 days, the current
          month is non-refundable, but you may cancel future months at any time with no further
          penalty. Contact us by email or phone to cancel.
        </p>
        <p>
          If we cancel a class or cannot deliver a paid service for reasons within our control,
          we will offer a makeup session, credit, or refund as appropriate.
        </p>
      </LegalSection>

      <LegalSection title="6. Classes, attendance, and conduct">
        <p>
          Standard group classes last 45 minutes (Hifz Support 30 minutes; advanced Arabic 60
          minutes), with a maximum of six students per group class unless otherwise stated.
          Classes are not recorded, to protect student privacy.
        </p>
        <p>
          With at least 24 hours&apos; notice of absence, we will try to arrange a makeup
          session at no extra charge. Without notice, a makeup is not guaranteed.
        </p>
        <p>
          Students and guardians must behave respectfully toward teachers and other students. We
          may suspend or end access without refund for serious or repeated misconduct, abuse, or
          misuse of our platforms.
        </p>
      </LegalSection>

      <LegalSection title="7. Technical requirements">
        <p>
          You are responsible for having a suitable device, camera, microphone, stable internet,
          and Zoom (or any platform we specify). Technical issues on your side do not
          automatically entitle you to a refund, though we will try to help and may reschedule
          where reasonable.
        </p>
      </LegalSection>

      <LegalSection title="8. Website and chatbot">
        <p>
          Our website and chatbot provide general information about Al-Noor Institute. The
          chatbot cannot book classes or complete enrolments. For bookings, use the enrolment
          form or contact us directly. Website content may change without notice.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual property">
        <p>
          Course materials, branding, website content, and related materials remain the property
          of Al-Noor Institute or our licensors. You may use materials only for your personal
          learning. You may not copy, share, sell, or republish them without our written
          permission.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of liability">
        <p>
          We provide educational services with reasonable care and skill. Nothing in these Terms
          excludes or limits liability that cannot be excluded under UK law (including for death
          or personal injury caused by negligence, or fraud).
        </p>
        <p>
          To the fullest extent permitted by law, we are not liable for indirect or
          consequential loss, or for loss arising from circumstances outside our reasonable
          control (including internet outages, third-party platform failures, or force majeure
          events). Our total liability for any claim relating to a course is limited to the fees
          you paid for that course in the three months before the claim.
        </p>
      </LegalSection>

      <LegalSection title="11. Privacy">
        <p>
          How we collect and use personal information is described in our{" "}
          <Link
            href="/privacy"
            className="font-medium text-navy underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          , which forms part of your agreement with us.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes">
        <p>
          We may update these Terms from time to time. The &quot;Last updated&quot; date will
          change when we do. Continued use of the site or services after changes means you
          accept the updated Terms. Material changes affecting an active enrolment will be
          communicated where reasonably practicable.
        </p>
      </LegalSection>

      <LegalSection title="13. Governing law">
        <p>
          These Terms are governed by the laws of England and Wales. Courts of England and Wales
          have exclusive jurisdiction, except that consumers may also bring claims in their
          local UK courts where the law allows.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          Al-Noor Institute
          <br />
          Email: <a href={`mailto:${institute.email}`}>{institute.email}</a>
          <br />
          Phone: {institute.phone} ({institute.phoneHours})
          <br />
          Website: {institute.website}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
