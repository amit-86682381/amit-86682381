import { Reveal, SplitText } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const titleColor = tone === "light" ? "text-white" : "text-navy-900";
  const textColor = tone === "light" ? "text-concrete-300" : "text-concrete-600";
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-3xl flex-col ${alignCls} ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <h2 className={`mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.5rem] ${titleColor}`}>
        <SplitText text={title} onView />
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-6 text-lg leading-relaxed ${textColor}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
