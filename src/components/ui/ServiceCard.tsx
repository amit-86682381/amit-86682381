import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { ServiceIcon } from "./Icons";
import type { Service } from "@/data/services";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-xl bg-navy-900 text-white"
      >
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-50 transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgb(242 107 29 / 0.18), transparent 60%)" }}
        />
        <div className="relative flex h-full flex-col p-7 sm:p-8">
          <div className="flex items-start justify-between">
            <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-orange-500 backdrop-blur-sm transition-colors duration-500 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-navy-950">
              <ServiceIcon name={service.icon} className="h-9 w-9" />
            </span>
            <span className="font-display text-sm text-concrete-400">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="mt-auto pt-24">
            <h3 className="text-2xl font-semibold">{service.title}</h3>
            <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-concrete-200 opacity-0 transition-all duration-700 ease-out group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100 max-lg:max-h-40 max-lg:opacity-100">
              {service.summary}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500">
              Learn more
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
