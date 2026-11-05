import Link from "next/link";

/**
 * Text-based placeholder logo. Replace the SVG mark and wordmark with the
 * official company logo when it becomes available.
 */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const text = tone === "light" ? "text-white" : "text-navy-900";
  const sub = tone === "light" ? "text-concrete-300" : "text-concrete-500";
  return (
    <Link href="/" aria-label="Ayni Sree Engineering Projects — home" className={`group inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="6" className="fill-navy-700" />
        <path d="M8 31 L18 9 H22 L32 31" className="fill-none stroke-white" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M20 14 V17 M20 21 V24 M20 28 V31" className="stroke-orange-500" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[15px] font-semibold tracking-tight ${text}`}>Ayni Sree</span>
        <span className={`mt-1 text-[10px] font-medium tracking-[0.2em] uppercase ${sub}`}>Engineering Projects</span>
      </span>
    </Link>
  );
}
