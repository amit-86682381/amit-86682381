import { Reveal, SplitText } from "@/components/motion/Reveal";

/** Consistent dark hero band for inner pages (navbar sits over it). */
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="topo-bg relative overflow-hidden bg-navy-950 pt-40 pb-20 text-white sm:pt-48 sm:pb-28">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
          <SplitText text={title} delay={0.1} />
        </h1>
        {text && (
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-concrete-300">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
