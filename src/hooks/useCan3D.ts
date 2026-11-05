"use client";

import { useEffect, useState } from "react";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Returns true only on capable, larger screens without a reduced-motion
 * preference. Mobile and reduced-motion users get the static fallback.
 */
export function useCan3D(minWidth = 768) {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const webgl = hasWebGL();
    const update = () => setCan(webgl && wide.matches && !motion.matches);
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, [minWidth]);
  return can;
}

/** Tracks whether an element is in the viewport (used to pause rendering). */
export function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}
