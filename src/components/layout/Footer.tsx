import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { locationLabel, navLinks, site } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-charcoal-950 text-concrete-300">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl font-display text-3xl leading-tight font-semibold text-white sm:text-5xl">
            Have an infrastructure requirement? <span className="text-orange-500">Let&apos;s talk.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-navy-950 md:self-auto"
          >
            Start an enquiry
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-concrete-400">
              {site.name} — civil engineering, construction and infrastructure services from {site.address.locality},{" "}
              {site.address.region}.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social media">
              {site.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-white/15 px-3 py-1.5 text-xs text-concrete-300 transition-colors hover:border-orange-500 hover:text-white"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span
                      className="inline-flex cursor-default rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs text-concrete-500"
                      title="Social profile link to be added"
                    >
                      {s.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Company</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-orange-500">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-orange-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-orange-500">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-orange-500">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                <span>{locationLabel}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                {site.phone ? (
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-orange-500">
                    {site.phone}
                  </a>
                ) : (
                  <span className="text-concrete-500">Phone number to be added</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-concrete-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Imagery shown is representative stock photography.</p>
        </div>
      </div>
    </footer>
  );
}
