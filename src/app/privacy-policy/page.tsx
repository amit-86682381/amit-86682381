import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { locationLabel, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the ${site.name} website — how enquiry form data is collected, used and protected.`,
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    title: "1. Who we are",
    body: `This website is operated by ${site.name}, a private limited company based in ${locationLabel}. You can reach us at ${site.email}.`,
  },
  {
    title: "2. Information we collect",
    body: "When you use the enquiry form, we collect the details you provide: your name, email address, phone number, company or organisation name, the service you are interested in, your project location and your message. We do not collect any personal information beyond what you choose to submit. We do not use analytics cookies or advertising trackers on this website.",
  },
  {
    title: "3. How we use your information",
    body: "We use the information you submit solely to respond to your enquiry, discuss your project requirements and, where relevant, prepare a proposal. We do not sell, rent or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "4. How enquiries are processed",
    body: "Enquiries submitted through the form are sent to our team by email. The form itself does not create user accounts, and no enquiry data is stored in a database on this website.",
  },
  {
    title: "5. Data retention",
    body: "We retain enquiry emails for as long as reasonably needed to respond to and follow up on your enquiry, and to meet any legal or contractual obligations. You may ask us to delete your information at any time.",
  },
  {
    title: "6. Third-party services",
    body: "This website displays placeholder photographs from Unsplash. When these images load, your browser connects to Unsplash directly, and its own privacy policy applies. Fonts are self-hosted.",
  },
  {
    title: "7. Your rights",
    body: `You may request access to, correction of, or deletion of the personal information you have shared with us by writing to ${site.email}.`,
  },
  {
    title: "8. Changes to this policy",
    body: "We may update this policy from time to time. Changes will be published on this page with an updated revision date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" text="How we collect, use and protect the information you share with us through this website." />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x max-w-3xl">
          <p className="text-sm text-concrete-500">Last updated: November 2025</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-semibold text-navy-900">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-concrete-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
