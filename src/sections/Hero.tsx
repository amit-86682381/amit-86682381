"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroVisual } from "@/components/three/HeroVisual";
import { SplitText } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-navy-950 text-white">
      <HeroVisual />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950 to-transparent" />

      <motion.div style={{ y, opacity }} className="container-x relative pb-24 sm:pb-28 lg:pb-32">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          Civil Engineering &middot; {site.address.locality}, {site.address.region}
        </motion.p>
        <h1 className="mt-6 max-w-5xl text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl lg:text-[5.5rem]">
          <SplitText text="Building Infrastructure." delay={0.3} className="block" />
          <SplitText text="Connecting Tomorrow." delay={0.55} className="block text-orange-500" />
        </h1>
        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-concrete-200 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
        >
          {site.description}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
        >
          <Button href="/services">Explore Our Services</Button>
          <Button href="/contact" variant="outline-light">
            Contact Us
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute right-5 bottom-8 hidden flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-concrete-300 uppercase sm:right-8 sm:flex lg:right-12">
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/30" aria-hidden="true">
          <span className="mt-2 h-2 w-1 animate-scroll-dot rounded-full bg-orange-500" />
        </span>
      </div>
    </section>
  );
}
