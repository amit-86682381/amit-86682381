import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export function ServicesSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="topo-bg relative bg-navy-950 py-24 text-white sm:py-32" aria-label="Our services">
      <div className="container-x">
        {showHeading && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              tone="light"
              eyebrow="What we do"
              title="Engineering services for the infrastructure that moves a region."
              text="Our proposed service areas span the lifecycle of road and civil infrastructure — from surveying the ground to maintaining finished assets."
            />
            <Reveal className="shrink-0">
              <Button href="/services" variant="outline-light">
                All services
              </Button>
            </Reveal>
          </div>
        )}
        <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-16" : ""}`}>
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
