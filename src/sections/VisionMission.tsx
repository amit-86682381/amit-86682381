import Image from "next/image";
import { MaskReveal, Reveal, SplitText } from "@/components/motion/Reveal";
import { visionMission } from "@/data/content";
import { images } from "@/data/images";

export function VisionMission() {
  return (
    <section className="relative bg-white py-24 sm:py-32" aria-label="Vision and mission">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Vision &amp; mission</p>
        </Reveal>
        <blockquote className="mt-8 max-w-5xl font-display text-3xl leading-[1.15] font-medium text-navy-900 sm:text-5xl lg:text-6xl">
          <SplitText text={visionMission.vision} onView />
        </blockquote>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MaskReveal className="relative aspect-[16/10] overflow-hidden rounded-xl lg:col-span-7">
            <Image
              src={images.roadLandscape.src}
              alt={images.roadLandscape.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </MaskReveal>
          <div className="flex flex-col justify-center gap-10 lg:col-span-5">
            <Reveal>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">Our vision</h3>
              <p className="mt-3 text-lg leading-relaxed text-concrete-600">{visionMission.vision}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">Our mission</h3>
              <p className="mt-3 text-lg leading-relaxed text-concrete-600">{visionMission.mission}</p>
            </Reveal>
            <Reveal delay={0.2} className="border-l-2 border-orange-500 pl-6">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">Our commitment</h3>
              <p className="mt-3 text-lg leading-relaxed text-navy-900">{visionMission.commitment}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
