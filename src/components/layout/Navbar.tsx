"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks, site } from "@/data/site";
import { setScrollLocked } from "./SmoothScroll";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${solid ? "border-b border-white/10 bg-navy-950/85 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <nav aria-label="Primary" className={`container-x flex items-center justify-between transition-all duration-500 ${solid ? "h-18" : "h-24"}`}>
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, -1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="group relative px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white aria-[current=page]:text-white"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-orange-500 transition-transform duration-500 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-orange-400 sm:inline-flex"
          >
            Contact Us
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="topo-bg fixed inset-x-0 top-18 bottom-0 h-[calc(100dvh-4.5rem)] overflow-y-auto bg-navy-950 lg:hidden"
            data-lenis-prevent
          >
            <ul className="container-x flex flex-col gap-1 pt-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-white/10 py-5 font-display text-4xl font-semibold text-white aria-[current=page]:text-orange-500"
                  >
                    <span className="text-xs font-medium text-concrete-400">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-x mt-10 pb-10 text-concrete-300">
              <p className="text-xs tracking-[0.2em] text-concrete-400 uppercase">Get in touch</p>
              <a href={`mailto:${site.email}`} className="mt-3 block text-lg text-white">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
