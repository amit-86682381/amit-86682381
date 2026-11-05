import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "bg-orange-500 text-navy-950 hover:bg-orange-400",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy-950",
  "outline-dark": "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
