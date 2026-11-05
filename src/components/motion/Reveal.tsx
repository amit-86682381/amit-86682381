"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({ y: "0%", transition: { duration: 1, delay: i * 0.06, ease } }),
};

/** Masked word-by-word text reveal. */
export function SplitText({
  text,
  className,
  delay = 0,
  onView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  onView?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger = onView
    ? { whileInView: "visible" as const, viewport: { once: true, margin: "-10% 0px" } }
    : { animate: "visible" as const };
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            custom={i + delay / 0.06}
            variants={wordVariants}
            initial={reduce ? false : "hidden"}
            {...trigger}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Image wrapper that reveals with a clip-path mask on scroll. */
export function MaskReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(18% 18% 18% 18% round 12px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.3, ease }}
    >
      {children}
    </motion.div>
  );
}
