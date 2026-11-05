import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactSection } from "@/sections/ContactSection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Ayni Sree Engineering Projects Private Limited in Ranchi, Jharkhand. Email ${site.email} or send an enquiry through the form.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's discuss your infrastructure requirement."
        text={`Email us at ${site.email}, or share your project details through the enquiry form below.`}
      />
      <ContactSection />
    </>
  );
}
