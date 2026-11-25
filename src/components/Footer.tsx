import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { navLinks, site, waLink } from "@/lib/site";
import { CopyrightYear } from "./CopyrightYear";
import { Logo } from "./Logo";
import ConsultButton from "./ConsultButton";

const services = [
  "Residential rooftop solar",
  "Housing society solar",
  "Commercial & industrial rooftop plants",
  "MSEDCL net-metering liaison",
  "PM Surya Ghar subsidy processing",
  "Solar finance & EMI assistance",
  "Earthing, SPD & electrical works",
];


export default function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-wash">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-11 w-11" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-extrabold uppercase tracking-[0.02em] text-forest">
                  {site.name}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf">
                  Solar Solutions
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest/65">
              {site.tagline}. Turnkey rooftop solar, MSEDCL net-metering and
              PM Surya Ghar subsidy processing for homes, housing societies and
              industries.
            </p>
            <a
              href={waLink(
                `Hello ${site.name}, I would like a rooftop solar quote.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-leaf px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-deep"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-forest">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-forest/65 transition-colors hover:text-leaf-deep"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <ConsultButton
                  className="text-sm font-bold text-forest transition-colors hover:text-leaf-deep"
                >
                  Get a free quote
                </ConsultButton>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-forest">
              Services
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm text-forest/65">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-forest">
              Visit / Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-3.5 text-sm text-forest/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                <address className="not-italic leading-relaxed">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.line3}
                  <br />
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-leaf-deep transition-colors hover:text-forest"
                  >
                    Get directions
                  </a>
                </address>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                <a
                  href={`tel:${site.phone}`}
                  className="font-semibold text-forest transition-colors hover:text-leaf-deep"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                <a
                  href={`tel:${site.officePhone}`}
                  className="font-semibold text-forest transition-colors hover:text-leaf-deep"
                >
                  {site.officePhoneDisplay}
                  <span className="ml-1.5 font-normal text-forest/50">(office)</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-leaf-deep"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-forest/10 pt-6 text-xs text-forest/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear fallback={2026} /> {site.name}. All rights reserved.
          </p>
          <p>
            Subsidy amounts as per PM Surya Ghar Muft Bijli Yojana guidelines.
            Savings shown are estimates, not guarantees.
          </p>
        </div>
      </div>
    </footer>
  );
}
