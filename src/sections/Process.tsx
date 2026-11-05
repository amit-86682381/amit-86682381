"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/content";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="relative overflow-hidden bg-charcoal-900 py-24 text-white sm:py-32" aria-label="Our working process">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="Our working process"
          title="From first conversation to final handover."
          text="A structured, transparent process keeps every stage of the work clear for clients and project teams."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-6 w-px origin-top bg-gradient-to-b from-orange-500 via-orange-500 to-orange-400 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <ol className="relative">
          {processSteps.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid gap-4 pb-16 pl-20 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
                <span
                  className="absolute top-0 left-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-orange-500/60 bg-charcoal-900 font-display text-sm font-semibold text-orange-500 md:left-1/2"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Reveal className={`${right ? "md:col-start-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-concrete-400 uppercase">Step {i + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-concrete-300">{step.text}</p>
                </Reveal>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
