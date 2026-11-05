import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesSection } from "@/sections/ServicesSection";
import { Process } from "@/sections/Process";
import { ContactSection } from "@/sections/ContactSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Road construction, road surveying and mapping, civil engineering works, infrastructure development, site preparation and infrastructure maintenance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Civil engineering and infrastructure services."
        text="Six service areas covering the lifecycle of road and civil infrastructure. Select a service to explore its proposed scope."
      />
      <ServicesSection showHeading={false} />
      <Process />
      <ContactSection />
    </>
  );
}
