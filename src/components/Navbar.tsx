"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { Logo } from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-cream/90 shadow-sm backdrop-blur-lg"
          : "border-b border-transparent bg-cream"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <Logo className="h-9 w-9 lg:h-10 lg:w-10" />
          <span className="flex flex-col leading-none">
            <span className="truncate font-display text-[15px] font-extrabold tracking-tight text-ink sm:text-[17px] lg:text-lg">
              Naval Electronics
            </span>
            <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50 sm:block">
              Solar &amp; Electrical
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 lg:flex"
          >
            <Phone className="h-4 w-4 text-emerald" aria-hidden />
            {site.phoneDisplay}
          </a>
          <a
            href="#quote"
            className="inline-flex shrink-0 whitespace-nowrap rounded-xl bg-amber px-3 py-2.5 text-[13px] font-bold text-ink shadow-lg shadow-amber/25 transition-all hover:bg-amber-deep hover:shadow-amber/40 sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Get Free Solar Quote</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 text-ink xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 bottom-0 z-40 origin-top overflow-y-auto border-t border-ink/10 bg-cream px-4 pb-10 pt-4 transition-all duration-200 xl:hidden lg:top-20 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        hidden={!open}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-amber px-5 py-3.5 text-center text-base font-bold text-ink shadow-lg shadow-amber/25"
          >
            Get Free Solar Quote
          </a>
          <a
            href={`tel:${site.phone}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-5 py-3.5 text-base font-semibold text-ink"
          >
            <Phone className="h-4 w-4 text-emerald" aria-hidden />
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
