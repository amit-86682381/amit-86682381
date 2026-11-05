"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { images } from "@/data/images";
import { useCan3D, useInView } from "@/hooks/useCan3D";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Hero background: a photographic fallback is always server-rendered (fast LCP,
 * mobile and reduced-motion friendly). On capable desktops the interactive 3D
 * highway scene fades in on top and pauses when scrolled out of view.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const can3D = useCan3D();
  const inView = useInView(ref);
  const [ready, setReady] = useState(false);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <Image
        src={images.heroHighway.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/40 to-navy-950" />
      {can3D && (
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
