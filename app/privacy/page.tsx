import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { institute } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy — Al-Noor Institute",
  description:
    "How Al-Noor Institute collects, uses, and protects your personal information when you use our website and online Islamic education services.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="24 July 2026">
      <LegalSection title="1. Who we are">
        <p>
          Al-Noor Institute (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a UK-based
          online Islamic education provider. We deliver live online classes in Quran &amp;
          Tajweed, Arabic, Islamic Studies, Seerah, and Hifz Support.
        </p>
        <p>
          For privacy questions, contact us at{" "}
          <a href={`mailto:${institute.email}`}>{institute.email}</a> or{" "}
          <a href={`tel:${institute.phone.replace(/\s/g, "")}`}>{institute.phone}</a> (
          {institute.phoneHours}).
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We may collect the following information when you use our website or services:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">Enrolment details:</strong> full name,
            email address, phone number, course preferences, preferred class times, teacher
            preference, and (where you enrol a child) the student&apos;s name and age.
          </li>
          <li>
            <strong className="font-semibold text-ink">Chat messages:</strong> messages you send
            through our website chatbot, which may include personal details you choose to share.
          </li>
          <li>
            <strong className="font-semibold text-ink">Contact enquiries:</strong> information you
            provide by email or phone.
          </li>
          <li>
            <strong className="font-semibold text-ink">Technical data:</strong> basic device and
            browser information, IP address, and pages visited, collected automatically to keep
            the site secure and working properly.
          </li>
          <li>
            <strong className="font-semibold text-ink">Advertising &amp; analytics data:</strong>{" "}
            if you arrived via Google Ads or similar campaigns, cookies and similar technologies
            may record how you interact with our ads and website (see section 6).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>We use personal information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Process enrolments, arrange classes, and communicate about your course</li>
          <li>Respond to enquiries and provide customer support</li>
          <li>Operate and improve our website chatbot and learning experience</li>
          <li>Send service-related messages (confirmations, schedule updates, reminders)</li>
          <li>Measure and improve advertising performance (including Google Ads)</li>
          <li>Meet legal and safeguarding obligations</li>
        </ul>
        <p>
          We do not sell your personal information. We do not share student class recordings —
          classes are not recorded, to protect the privacy of everyone in the session.
        </p>
      </LegalSection>

      <LegalSection title="4. Legal bases (UK GDPR)">
        <p>Where UK data protection law applies, we process personal data on these bases:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">Contract:</strong> to enrol you and deliver
            the course you requested
          </li>
          <li>
            <strong className="font-semibold text-ink">Legitimate interests:</strong> to operate,
            secure, and improve our website and services
          </li>
          <li>
            <strong className="font-semibold text-ink">Consent:</strong> where required for
            non-essential cookies or marketing communications (you can withdraw at any time)
          </li>
          <li>
            <strong className="font-semibold text-ink">Legal obligation:</strong> where we must
            keep or disclose information to comply with the law
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Children">
        <p>
          We offer courses for children aged 5 and above. Parents or guardians must enrol
          children and must be present for children under 10 during classes. We collect a
          child&apos;s name and age only as needed to provide the service, and we treat that
          information with extra care.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies, Google Ads, and analytics">
        <p>
          Our website may use cookies and similar technologies. Essential cookies help the site
          function. If we run Google Ads or analytics, Google and similar partners may use
          cookies to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Show relevant ads and measure whether ads lead to visits or enrolments</li>
          <li>Understand how visitors use our pages so we can improve them</li>
        </ul>
        <p>
          You can control cookies through your browser settings. Google also provides tools to
          manage ad personalisation at{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            adssettings.google.com
          </a>
          . For more on how Google uses data, see{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Sharing your information">
        <p>We may share information with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Teachers and staff, only as needed to deliver your course</li>
          <li>
            Service providers who host our website, store data, process payments, or send emails
            — under agreements that require them to protect your information
          </li>
          <li>Advertising partners such as Google, when you interact with our ads or site</li>
          <li>Authorities, if required by law or to protect someone&apos;s safety</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. How long we keep data">
        <p>
          We keep enrolment and contact records for as long as needed to provide the service and
          meet legal, accounting, or safeguarding requirements. Chat transcripts may be retained
          for quality and support purposes and then deleted or anonymised when no longer needed.
        </p>
      </LegalSection>

      <LegalSection title="9. Your rights">
        <p>Under UK data protection law, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access the personal data we hold about you</li>
          <li>Ask us to correct inaccurate information</li>
          <li>Ask us to delete your data in certain circumstances</li>
          <li>Object to or restrict certain processing</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Complain to the Information Commissioner&apos;s Office (ICO)</li>
        </ul>
        <p>
          To exercise these rights, email{" "}
          <a href={`mailto:${institute.email}`}>{institute.email}</a>. We will respond within a
          reasonable time.
        </p>
      </LegalSection>

      <LegalSection title="10. Security">
        <p>
          We take reasonable technical and organisational steps to protect personal information.
          No online service is completely secure; please use a strong password where accounts
          apply and do not share login details.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
          at the top of this page will change when we do. Continued use of the site after changes
          means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Al-Noor Institute
          <br />
          Email: <a href={`mailto:${institute.email}`}>{institute.email}</a>
          <br />
          Phone: {institute.phone} ({institute.phoneHours})
          <br />
          Website: {institute.website}
        </p>
        <p>
          See also our{" "}
          <Link href="/terms" className="font-medium text-navy underline-offset-2 hover:underline">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
