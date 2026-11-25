import {
  ArrowRight,
  BadgeCheck,
  BadgePercent,
  IndianRupee,
  Sparkles,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { site } from "@/lib/site";
import { formatINR } from "@/lib/solar";
import ConsultButton from "./ConsultButton";
import OfferDeadline from "./OfferDeadline";

const highlights = [
  { icon: BadgePercent, value: "0%", label: "Interest on EMI" },
  { icon: Wallet, value: "₹0", label: "Down payment" },
  { icon: IndianRupee, value: "₹78,000", label: "Govt. subsidy" },
  {
    icon: Sparkles,
    value: formatINR(site.offer.startingPrice),
    label: "Complete system from",
  },
];

export default function Hero() {
  const { src, alt } = site.heroBanner;

  return (
    <section id="top" className="px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      <div className="relative isolate mx-auto flex min-h-[640px] max-w-[96rem] flex-col overflow-hidden rounded-[1.75rem] bg-ink sm:min-h-[600px] lg:min-h-[680px] lg:rounded-[2.25rem]">
        {/* Banner image (or designed placeholder until the photo is ready) */}
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        ) : (
          <BannerPlaceholder />
        )}

        {/* Legibility scrim */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/65 lg:to-ink/5"
        />

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-6 pt-14 sm:px-8 sm:pb-8 lg:justify-center lg:px-12 lg:py-16">
          <div className="animate-rise max-w-2xl">
            {/* Offer ribbon */}
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl bg-white/10 p-1 pr-3 sm:rounded-full ring-1 ring-white/20 backdrop-blur-md sm:pr-4">
              <span className="whitespace-nowrap rounded-full bg-amber px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink sm:px-3 sm:text-[11px]">
                <span className="sm:hidden">Festival Offer</span>
                <span className="hidden sm:inline">{site.offer.label}</span>
              </span>
              <span className="whitespace-nowrap pl-1.5 text-[13px] font-bold text-white sm:pl-0 sm:text-sm">
                0% Interest &nbsp;·&nbsp; 0% Down Payment
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
              Go solar today.
              <br />
              <span className="bg-gradient-to-r from-amber via-yellow-300 to-amber bg-clip-text text-transparent">
                Pay nothing upfront.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Rooftop solar for homes, businesses and housing societies. Up to
              ₹78,000 government subsidy, complete systems from{" "}
              <strong className="font-bold text-white">
                {formatINR(site.offer.startingPrice)}
              </strong>{" "}
              with top brands, and MSEDCL net-metering, all handled by{" "}
              {site.name}.
            </p>
            <p className="mt-3 max-w-xl text-sm font-semibold text-amber sm:text-base">
              0% interest and 0% down payment: a scheme you will only find with{" "}
              {site.name}.
            </p>

            <OfferDeadline />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsultButton className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-amber px-8 py-4 text-base font-extrabold text-ink shadow-2xl shadow-amber/40 transition-all hover:-translate-y-0.5 hover:bg-amber-deep sm:text-lg">
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                Get Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </ConsultButton>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-7 py-4 text-base font-bold text-white ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/20"
              >
                <TrendingDown className="h-5 w-5 text-amber" aria-hidden />
                Calculate Savings
              </a>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-white/55">
              <BadgeCheck className="h-4 w-4 shrink-0 text-emerald" aria-hidden />
              MSEDCL &amp; PM Surya Ghar approved partner · Free loan consultation
            </p>
          </div>
        </div>

        {/* Highlight strip */}
        <div className="relative mx-auto w-full max-w-7xl px-3 pb-3 sm:px-5 sm:pb-5 lg:px-8 lg:pb-8">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur-xl lg:grid-cols-4">
            {highlights.map(({ icon: Icon, value, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 bg-ink/55 px-4 py-4 sm:px-5 sm:py-5"
              >
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber min-[480px]:inline-flex sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-extrabold leading-none text-white min-[480px]:text-xl sm:text-2xl">
                    {value}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wider text-white/55 sm:text-xs">
                    {label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-center text-[10px] text-white/40 lg:text-right">
            *0% interest via No-Cost EMI partners; loans subject to lender
            approval. Package price is a starting price; final quote depends on
            system size, brand and site survey.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Stand-in artwork for the hero banner: dusk sky, sun glow and a receding
 * solar array. Replace by setting `site.heroBanner.src`.
 */
function BannerPlaceholder() {
  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a3a] via-[#1e3a8a] to-[#f59e0b]/80" />
      <div className="absolute -right-24 top-[-6rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(253,224,71,0.55)_0%,rgba(245,158,11,0.25)_35%,transparent_68%)] sm:right-[2%]" />
      <div className="absolute right-[6%] top-[18%] h-36 w-36 rounded-full bg-[radial-gradient(circle_at_40%_35%,#fef9c3_0%,#fde047_30%,#f59e0b_75%)] opacity-90 shadow-[0_0_120px_40px_rgba(245,158,11,0.45)] sm:right-[14%] sm:h-52 sm:w-52" />
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[62%] w-full"
      >
        <defs>
          <linearGradient id="hero-cell" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="hero-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e293b" stopOpacity="0" />
            <stop offset="0.25" stopColor="#1e293b" />
            <stop offset="1" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect y="200" width="1600" height="350" fill="url(#hero-ground)" />
        {Array.from({ length: 5 }).map((_, row) => {
          const y = 270 + row * 62;
          const scale = 0.55 + row * 0.13;
          const w = 150 * scale;
          const h = 46 * scale;
          const count = Math.ceil(1600 / (w + 10)) + 2;
          return (
            <g key={row} opacity={0.55 + row * 0.1}>
              {Array.from({ length: count }).map((__, i) => {
                const x = i * (w + 10) - (row % 2) * (w / 2);
                return (
                  <g key={i}>
                    <polygon
                      points={`${x + 10},${y} ${x + w},${y} ${x + w - 8},${y + h} ${x},${y + h}`}
                      fill="url(#hero-cell)"
                      stroke="#93c5fd"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                    />
                    <line
                      x1={x + w / 2 + 1}
                      y1={y}
                      x2={x + w / 2 - 3}
                      y2={y + h}
                      stroke="#93c5fd"
                      strokeOpacity="0.25"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      {process.env.NODE_ENV !== "production" && (
        <span className="absolute right-4 top-4 rounded-md border border-dashed border-white/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
          Banner image placeholder
        </span>
      )}
    </div>
  );
}
