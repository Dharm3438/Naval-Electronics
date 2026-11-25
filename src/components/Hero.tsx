import {
  ArrowRight,
  BadgeIndianRupee,
  CirclePercent,
  SolarPanel,
  Star,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { site } from "@/lib/site";
import { formatINR } from "@/lib/solar";
import ConsultButton from "./ConsultButton";
import OfferDeadline from "./OfferDeadline";

const price = formatINR(site.offer.startingPrice);

const highlights = [
  { icon: CirclePercent, value: "0%", label: "Interest on EMI" },
  { icon: Wallet, value: "₹0", label: "Down payment" },
  { icon: BadgeIndianRupee, value: "₹78,000", label: "Govt. subsidy" },
  {
    icon: SolarPanel,
    value: price,
    label: (
      <>
        Complete 3<span className="normal-case">k</span>W system from
      </>
    ),
  },
];

export default function Hero() {
  return (
    <section id="top" className="px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      <div className="relative isolate mx-auto flex max-w-[96rem] flex-col overflow-hidden rounded-[1.75rem] bg-wash ring-1 ring-leaf/10 lg:rounded-[2.25rem]">
        <HeroBackdrop />
        <HeroImage />

        <div className="mx-auto w-full max-w-7xl flex-1 px-5 pb-6 pt-2 sm:px-8 sm:pt-4 lg:px-12 lg:pb-10 lg:pt-14">
          <div className="animate-rise relative z-10 min-w-0 lg:max-w-[46rem] xl:max-w-[50rem]">
            {/* Offer ribbon */}
            <div className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl sm:flex-nowrap bg-white/80 p-1 pr-4 shadow-sm ring-1 ring-leaf/20 backdrop-blur sm:rounded-full">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-leaf px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white sm:text-[11px]">
                <Star className="h-3 w-3 fill-current" aria-hidden />
                {site.offer.label}
              </span>
              <span className="pl-2 text-[12px] font-medium text-forest/80 sm:whitespace-nowrap sm:pl-0 sm:text-sm">
                MSEDCL &amp; PM Surya Ghar Approved Partner
                <span className="hidden sm:inline">
                  <span className="mx-2 text-leaf" aria-hidden>
                    •
                  </span>
                  {site.name}
                </span>
              </span>
            </div>

            <h1 className="mt-6 font-display text-[1.7rem] font-extrabold uppercase leading-[1.12] tracking-tight text-forest min-[420px]:text-[2.1rem] sm:text-5xl lg:text-[2.45rem] xl:text-[2.85rem]">
              <span className="flex items-center gap-3">
                Go solar today
                <SunMark />
              </span>
              <span className="block text-leaf">
                0% interest <span aria-hidden>·</span>{" "}
                <span className="whitespace-nowrap">₹0 down payment</span>
              </span>
              <span className="block">
                <span className="text-leaf">₹78,000</span> govt. subsidy
              </span>
              <span className="block">
                Complete 3<span className="normal-case">k</span>W system
              </span>
              <span className="block">
                Starting at{" "}
                <span className="whitespace-nowrap text-gold">{price}</span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-forest/80 sm:text-lg">
              Rooftop solar for homes, businesses &amp; societies. Complete
              systems with top brands and MSEDCL net-metering. All handled by{" "}
              {site.name}.
            </p>

            <OfferDeadline />

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsultButton className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-leaf px-8 py-4 text-base font-bold text-white shadow-xl shadow-leaf/30 transition-all hover:-translate-y-0.5 hover:bg-leaf-deep hover:shadow-leaf/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf sm:text-lg">
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                Get Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </ConsultButton>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/70 px-7 py-[0.9rem] text-base font-bold text-forest ring-2 ring-leaf/70 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:ring-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf sm:text-lg"
              >
                <TrendingDown className="h-5 w-5 text-leaf" aria-hidden />
                Calculate Savings
              </a>
            </div>

            <p className="mt-4 text-xs font-medium text-forest/60 sm:text-sm">
              700+ installations done • Free loan consultation • Handled by{" "}
              {site.name}
            </p>
          </div>
        </div>

        {/* Highlight cards strung on a single green line */}
        <div className="relative mx-auto w-full max-w-7xl px-3 pb-4 sm:px-5 sm:pb-6 lg:px-8 lg:pb-8">
          <span
            aria-hidden
            className="absolute inset-x-0 top-[calc(50%-1.1rem)] hidden h-0.5 bg-gradient-to-r from-leaf/0 via-leaf/70 to-leaf/0 lg:block"
          />
          <ul className="relative grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {highlights.map(({ icon: Icon, value, label }, i) => (
              <li
                key={value}
                style={{ animationDelay: `${150 + i * 90}ms` }}
                className="animate-rise flex items-center gap-3 rounded-2xl bg-white/85 px-3.5 py-3.5 shadow-[0_8px_30px_-12px_rgba(11,59,44,0.25)] ring-1 ring-leaf/15 backdrop-blur transition-transform hover:-translate-y-1 sm:px-5 sm:py-4"
              >
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-leaf ring-1 ring-leaf/25 min-[420px]:inline-flex sm:h-12 sm:w-12">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-extrabold leading-none text-forest sm:text-2xl">
                    {value}
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-forest/70 sm:text-xs">
                    {label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[10px] text-forest/50 sm:text-[11px]">
            *0% interest via No-Cost EMI partners; loans subject to lender
            approval. Starting price for complete 3kW system; final quote depends
            on brand and site survey.
          </p>
        </div>
      </div>
    </section>
  );
}

const srcSet = (list: ReadonlyArray<{ src: string; width: number }>) =>
  list.map(({ src, width }) => `${src} ${width}w`).join(", ");

/**
 * The hero artwork. From `lg` it is the full-bleed background (house on the
 * right, fade, wave and sprig on the left). On phones and tablets a crop of
 * just the house is shown as a banner above the copy, fading into the page.
 */
function HeroImage() {
  const { desktop, mobile, alt } = site.heroImage;
  return (
    <div className="relative h-56 overflow-hidden min-[420px]:h-64 sm:h-80 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={srcSet(desktop)}
          sizes="(min-width: 1536px) 96rem, 100vw"
        />
        <img
          src={mobile[mobile.length - 1].src}
          srcSet={srcSet(mobile)}
          sizes="100vw"
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[center_60%] lg:object-[72%_center] xl:object-right"
        />
      </picture>
      {/* Phone: fade the bottom of the banner into the copy. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-wash to-transparent lg:hidden" />
      {/* Narrow desktops crop the artwork's white side, so soften the photo behind the text. */}
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[68%] bg-gradient-to-r from-white via-white/85 to-transparent lg:block xl:hidden" />
    </div>
  );
}

/** Glowing, slowly turning sun next to "Go solar today". */
function SunMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className="animate-sun-glow h-[0.95em] w-[0.95em] shrink-0"
    >
      <defs>
        <radialGradient id="sun-core" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="0.45" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <g className="animate-sun-spin origin-center [transform-box:fill-box]">
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={i}
            d="M32 2 L35 13 L29 13 Z"
            fill="#fbbf24"
            transform={`rotate(${i * 30} 32 32)`}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="15" fill="url(#sun-core)" />
    </svg>
  );
}

/** Bottom-left wave and leaf sprig for phones (the desktop artwork has its own). */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden">
      <svg
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[55%] w-full"
      >
        <path
          d="M0 120 C 160 210 260 330 470 360 C 690 390 760 300 1000 340 C 1200 372 1330 430 1440 420 L1440 520 L0 520 Z"
          fill="#d7f0e1"
          fillOpacity="0.55"
        />
        <path
          d="M0 260 C 200 330 330 420 560 430 C 760 440 900 400 1100 430 C 1250 452 1360 480 1440 470 L1440 520 L0 520 Z"
          fill="#c6ead5"
          fillOpacity="0.45"
        />
      </svg>
      <svg
        viewBox="0 0 160 260"
        className="animate-sway absolute bottom-[14%] left-[1%] hidden h-56 w-auto origin-bottom text-leaf/25 sm:block"
      >
        <path d="M60 255 C 70 190 80 120 120 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M118 34 C 140 20 150 6 152 0 C 130 4 112 14 108 36 Z" fill="currentColor" />
        <path d="M95 95 C 60 80 40 92 30 110 C 55 120 82 116 95 95 Z" fill="currentColor" />
        <path d="M102 80 C 130 58 150 60 158 70 C 140 92 116 94 102 80 Z" fill="currentColor" />
        <path d="M80 150 C 46 140 26 152 18 170 C 44 178 68 172 80 150 Z" fill="currentColor" />
        <path d="M84 140 C 108 118 130 118 140 126 C 124 150 100 154 84 140 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
