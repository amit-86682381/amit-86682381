import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed border-orange-500/70 bg-navy-950/70 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-orange-400 uppercase backdrop-blur ${className}`}
    >
      Sample content
    </span>
  );
}

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className={`relative overflow-hidden rounded-xl bg-navy-900 ${large ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]" : "aspect-[4/3]"}`}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
        {project.isSample && <SampleBadge className="absolute top-5 left-5" />}
        <span className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-950 opacity-0 transition-all duration-500 group-hover:opacity-100 max-lg:opacity-100">
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-500 uppercase">{project.category}</p>
          <h3 className={`mt-2 font-semibold ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>{project.title}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-concrete-300">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {project.location}
          </p>
          {large && <p className="mt-3 max-w-md text-sm text-concrete-200">{project.summary}</p>}
        </div>
      </div>
    </Link>
  );
}
