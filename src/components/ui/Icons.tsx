import {
  BadgeCheck,
  Compass,
  ScanLine,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/data/services";
import type { ValueIconKey } from "@/data/content";

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Custom line icons for each service category. */
const serviceIcons: Record<ServiceIconKey, React.ReactNode> = {
  road: (
    <>
      <path d="M17 6 L7 42" />
      <path d="M31 6 L41 42" />
      <path d="M24 8v5M24 19v6M24 31v8" strokeWidth="2.6" />
    </>
  ),
  survey: (
    <>
      <circle cx="24" cy="12" r="5" />
      <path d="M24 17v6M24 23l-10 19M24 23l10 19M24 23v19" />
      <path d="M29 12h9" />
    </>
  ),
  civil: (
    <>
      <path d="M6 42h36" />
      <path d="M10 42V20l14-10 14 10v22" />
      <path d="M18 42V28h12v14" />
      <path d="M10 20h28" />
    </>
  ),
  infrastructure: (
    <>
      <path d="M4 30h40" />
      <path d="M4 30c8-14 32-14 40 0" />
      <path d="M12 30v12M24 22v20M36 30v12" />
      <path d="M18 24.5v5.5M30 24.5v5.5" />
    </>
  ),
  site: (
    <>
      <path d="M4 40h40" />
      <path d="M8 40l8-12h10l4 6" />
      <path d="M28 34l6-10 10 16" />
      <path d="M14 14l6-6 4 4 8-6" />
    </>
  ),
  maintenance: (
    <>
      <path d="M30 8a8 8 0 0 0-9 11L8 32a3.5 3.5 0 0 0 5 5l13-13a8 8 0 0 0 11-9l-5 5-5-1-1-5z" />
    </>
  ),
};

export function ServiceIcon({ name, className = "h-10 w-10" }: { name: ServiceIconKey; className?: string }) {
  return (
    <svg {...base} className={className}>
      {serviceIcons[name]}
    </svg>
  );
}

const valueIcons: Record<ValueIconKey, LucideIcon> = {
  compass: Compass,
  scan: ScanLine,
  badge: BadgeCheck,
  shield: ShieldCheck,
  target: Target,
  users: Users,
};

export function ValueIcon({ name, className = "h-6 w-6" }: { name: ValueIconKey; className?: string }) {
  const Icon = valueIcons[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.6} />;
}
