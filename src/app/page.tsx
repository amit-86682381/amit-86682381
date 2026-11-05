import { Hero } from "@/sections/Hero";
import { Intro } from "@/sections/Intro";
import { ServicesSection } from "@/sections/ServicesSection";
import { WhyUs } from "@/sections/WhyUs";
import { Portfolio } from "@/sections/Portfolio";
import { Process } from "@/sections/Process";
import { VisionMission } from "@/sections/VisionMission";
import { ContactSection } from "@/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesSection />
      <WhyUs />
      <Portfolio />
      <Process />
      <VisionMission />
      <ContactSection />
    </>
  );
}
