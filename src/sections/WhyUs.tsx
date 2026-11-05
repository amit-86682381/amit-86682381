import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValueIcon } from "@/components/ui/Icons";
import { values } from "@/data/content";
import { images } from "@/data/images";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-concrete-100 py-24 sm:py-32" aria-label="Why choose us">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Why choose us"
              title="Principles that guide how we work."
              text="These are the working values we bring to every engagement — the standards we hold ourselves to on site and off."
            />
            <Reveal delay={0.2} className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-xl lg:block">
              <Image src={images.engineerPlans.src} alt={images.engineerPlans.alt} fill sizes="40vw" className="object-cover" />
            </Reveal>
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-xl bg-concrete-300 sm:grid-cols-2 lg:col-span-7">
          {values.map((v, i) => (
            <Reveal
              as="li"
              key={v.title}
              delay={(i % 2) * 0.08}
              className="group relative bg-white p-8 transition-colors duration-500 hover:bg-navy-900 sm:p-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 transition-colors duration-500 group-hover:bg-orange-500 group-hover:text-navy-950">
                <ValueIcon name={v.icon} />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-navy-900 transition-colors duration-500 group-hover:text-white">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-concrete-600 transition-colors duration-500 group-hover:text-concrete-300">
                {v.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
