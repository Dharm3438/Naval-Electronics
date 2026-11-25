"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import ConsultButton from "./ConsultButton";
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
          ? "border-b border-forest/10 bg-wash/90 shadow-sm backdrop-blur-lg"
          : "border-b border-transparent bg-wash"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <Logo className="h-9 w-9 lg:h-10 lg:w-10" />
          <span className="flex flex-col leading-none">
            <span className="truncate font-display text-[14px] font-extrabold uppercase tracking-[0.02em] text-forest sm:text-base lg:text-[17px]">
              Naval Electronics
            </span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf sm:block">
              Solar Solutions
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium text-forest/70 transition-colors hover:bg-forest/5 hover:text-forest"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest/5 2xl:flex"
          >
            <Phone className="h-4 w-4 text-leaf" aria-hidden />
            {site.phoneDisplay}
          </a>
          <ConsultButton className="inline-flex shrink-0 whitespace-nowrap rounded-xl bg-leaf px-3 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-leaf/25 transition-all hover:bg-leaf-deep hover:shadow-leaf/40 sm:px-5 sm:text-sm">
            <span className="sm:hidden">Free Consult</span>
            <span className="hidden sm:inline">Get Free Consultation</span>
          </ConsultButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-forest/15 text-forest xl:hidden"
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
        className={`fixed inset-x-0 top-16 bottom-0 z-40 origin-top overflow-y-auto border-t border-forest/10 bg-wash px-4 pb-10 pt-4 transition-all duration-200 xl:hidden lg:top-20 ${
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
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-3">
          <ConsultButton
            onClick={() => setOpen(false)}
            className="rounded-xl bg-leaf px-5 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-leaf/25"
          >
            Get Free Consultation
          </ConsultButton>
          <a
            href={`tel:${site.phone}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-forest/15 px-5 py-3.5 text-base font-semibold text-forest"
          >
            <Phone className="h-4 w-4 text-leaf" aria-hidden />
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
