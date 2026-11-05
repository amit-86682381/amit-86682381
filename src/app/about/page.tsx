import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Intro } from "@/sections/Intro";
import { WhyUs } from "@/sections/WhyUs";
import { Process } from "@/sections/Process";
import { VisionMission } from "@/sections/VisionMission";
import { ContactSection } from "@/sections/ContactSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ayni Sree Engineering Projects Private Limited is a civil engineering and construction company based in Ranchi, Jharkhand, focused on roads, surveying and infrastructure development.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A civil engineering company built on precision."
        text="Who we are, how we work and what we are building towards."
      />
      <Intro showLink={false} />
      <VisionMission />
      <WhyUs />
      <Process />
      <ContactSection />
    </>
  );
}
