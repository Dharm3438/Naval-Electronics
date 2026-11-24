import { BadgeCheck, CalendarCheck, IndianRupee, ShieldCheck, Sparkles, TrendingDown, Zap } from "lucide-react";
import { site } from "@/lib/site";
import { RooftopIllustration } from "./RooftopIllustration";

const trustStrip = [
  { icon: ShieldCheck, label: "25-Year Panel Warranty" },
  { icon: IndianRupee, label: "Up to ₹78,000 Govt. Subsidy" },
  { icon: Zap, label: "100% MSEDCL Net-Metering Support" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 36rem at 85% -10%, rgba(245,158,11,0.16), transparent 60%), radial-gradient(48rem 30rem at 5% 10%, rgba(16,185,129,0.12), transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-emerald-deep sm:text-[13px]">
            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
            MSEDCL &amp; PM Surya Ghar Approved Solar Partner
          </div>

          <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Cut Your Electricity Bill by{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">Up to 90%</span>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 -z-0 h-2.5 rounded-full bg-amber/45 sm:h-3"
              />
            </span>{" "}
            with Engineered Rooftop Solar
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            Turnkey residential and commercial solar installations in{" "}
            {site.city} by {site.name}. Complete MSEDCL net-metering, up to
            ₹78,000 government subsidy, and 25-year warranty.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-7 py-4 text-base font-bold text-ink shadow-xl shadow-amber/30 transition-all hover:bg-amber-deep hover:shadow-amber/45"
            >
              <TrendingDown className="h-5 w-5" aria-hidden />
              Calculate Your Savings
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink/15 bg-white px-7 py-4 text-base font-bold text-ink transition-all hover:border-ink/35 hover:bg-white"
            >
              <CalendarCheck className="h-5 w-5 text-emerald" aria-hidden />
              Book Free Site Survey
            </a>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-ink/10 pt-7 sm:grid-cols-3 sm:gap-4">
            {trustStrip.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
                <span className="text-sm font-semibold leading-snug text-ink/80">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <RooftopIllustration className="w-full drop-shadow-xl" />

          {/* Live savings badge */}
          <div className="absolute -bottom-4 left-0 w-[min(19rem,88%)] rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-2xl backdrop-blur sm:-bottom-6 sm:left-4 lg:animate-float">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-deep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Typical 4 kW Home System
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-3xl font-extrabold leading-none text-ink">
                ₹4,050
              </span>
              <span className="pb-0.5 text-sm font-semibold text-ink/55">
                saved / month
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-amber/15 px-2.5 py-1.5 text-xs font-bold text-amber-deep">
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              ₹78,000 subsidy already deducted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
