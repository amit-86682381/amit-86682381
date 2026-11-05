import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { ServiceIcon } from "@/components/ui/Icons";
import { ContactSection } from "@/sections/ContactSection";
import { getService, services } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-40 pb-20 text-white sm:pt-48 sm:pb-28">
        <Image src={service.image.src} alt="" fill sizes="100vw" className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950" />
        <div className="container-x relative">
          <Reveal>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-concrete-300 transition-colors hover:text-orange-500">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-500">
              <ServiceIcon name={service.icon} className="h-9 w-9" />
            </span>
            <p className="text-xs font-semibold tracking-[0.2em] text-concrete-300 uppercase">Service</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-concrete-200">{service.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Overview</p>
              <p className="mt-6 text-xl leading-relaxed text-concrete-600">{service.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">Proposed scope of work</h2>
              <ul className="mt-6 space-y-4">
                {service.scope.map((item) => (
                  <li key={item} className="flex gap-4 text-concrete-600">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-600">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">How we approach it</h2>
            </Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {service.approach.map((a, i) => (
                <Reveal key={a.title} delay={0.15 + i * 0.08} className="rounded-xl border border-concrete-200 p-6">
                  <h3 className="font-semibold text-navy-900">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-600">{a.text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <MaskReveal className="relative aspect-[4/3] overflow-hidden rounded-xl lg:sticky lg:top-32">
              <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </MaskReveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-concrete-200 bg-concrete-50 py-20" aria-label="Other services">
        <div className="container-x">
          <Reveal>
            <h2 className="text-3xl font-semibold text-navy-900">Explore other services</h2>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl bg-concrete-200 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col gap-4 bg-white p-6 transition-colors duration-300 hover:bg-navy-900"
                >
                  <span className="text-orange-600 transition-colors group-hover:text-orange-500">
                    <ServiceIcon name={s.icon} className="h-8 w-8" />
                  </span>
                  <span className="text-sm font-semibold text-navy-900 transition-colors group-hover:text-white">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection defaultService={service.title} />
    </>
  );
}
