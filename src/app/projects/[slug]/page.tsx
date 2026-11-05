import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { SampleBadge } from "@/components/ui/ProjectCard";
import { ContactSection } from "@/sections/ContactSection";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${project.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-40 pb-20 text-white sm:pt-48 sm:pb-24">
        <Image src={project.image.src} alt="" fill sizes="100vw" className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950" />
        <div className="container-x relative">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-concrete-300 transition-colors hover:text-orange-500">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
              </Link>
              {project.isSample && <SampleBadge />}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-xs font-semibold tracking-[0.2em] text-orange-500 uppercase">{project.category}</p>
            <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">{project.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-concrete-300">
              <MapPin className="h-4 w-4 text-orange-500" aria-hidden="true" />
              {project.location}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Overview</p>
              <p className="mt-6 text-xl leading-relaxed text-concrete-600">{project.overview}</p>
            </Reveal>
            {project.isSample && (
              <Reveal delay={0.1} className="mt-10 rounded-xl border border-dashed border-orange-500/50 bg-orange-500/5 p-6">
                <p className="text-sm leading-relaxed text-concrete-700">
                  This is placeholder content. It exists to demonstrate how real projects will be presented on this
                  website and does not describe work carried out by {`Ayni Sree Engineering Projects Private Limited`}.
                </p>
              </Reveal>
            )}
            <Reveal delay={0.15}>
              <h2 className="mt-14 text-2xl font-semibold text-navy-900">Key details</h2>
              <ul className="mt-6 space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-4 text-concrete-600">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-600">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <aside className="lg:col-span-5">
            <MaskReveal className="relative aspect-[4/3] overflow-hidden rounded-xl lg:sticky lg:top-32">
              <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </MaskReveal>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-concrete-200 bg-concrete-50 py-20" aria-label="More projects">
          <div className="container-x">
            <Reveal>
              <h2 className="text-3xl font-semibold text-navy-900">More projects</h2>
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group flex h-full flex-col gap-3 rounded-xl bg-white p-6 transition-colors hover:bg-navy-900">
                    <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase group-hover:text-orange-500">
                      {p.category}
                    </p>
                    <p className="text-lg font-semibold text-navy-900 group-hover:text-white">{p.title}</p>
                    <p className="text-sm text-concrete-600 group-hover:text-concrete-300">{p.location}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
