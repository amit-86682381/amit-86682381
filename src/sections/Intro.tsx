import Image from "next/image";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { about } from "@/data/content";
import { images } from "@/data/images";
import { site } from "@/data/site";

export function Intro({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="relative bg-white py-24 sm:py-32" aria-label="About the company">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src={images.engineerSite.src}
              alt={images.engineerSite.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </MaskReveal>
          <Reveal
            delay={0.3}
            className="absolute -right-2 -bottom-8 max-w-[260px] rounded-xl bg-navy-900 p-6 text-white shadow-2xl sm:-right-8"
          >
            <p className="text-xs tracking-[0.2em] text-orange-500 uppercase">Based in</p>
            <p className="mt-2 font-display text-2xl font-semibold">
              {site.address.locality}, {site.address.region}
            </p>
            <p className="mt-2 text-sm text-concrete-300">{site.legalType}</p>
          </Reveal>
        </div>

        <div>
          <SectionHeading eyebrow="About the company" title={about.heading} />
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className="mt-6 text-lg leading-relaxed text-concrete-600">{p}</p>
            </Reveal>
          ))}
          <div className="mt-12 grid gap-8 border-t border-concrete-200 pt-10 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.1 * i}>
                <span className="font-display text-sm text-orange-500">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete-600">{pillar.text}</p>
              </Reveal>
            ))}
          </div>
          {showLink && (
            <Reveal className="mt-12">
              <Button href="/about" variant="outline-dark">
                More about us
              </Button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
