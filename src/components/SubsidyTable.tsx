"use client";

import { useState } from "react";
import { ArrowRight, BadgeIndianRupee, CheckCircle2, FileCheck2 } from "lucide-react";
import { formatINR, subsidyTiers } from "@/lib/solar";
import ConsultButton from "./ConsultButton";

const defaultTier = Math.max(
  0,
  subsidyTiers.findIndex((t) => "highlight" in t && t.highlight),
);

export default function SubsidyTable() {
  // Phones show one tier at a time, picked from the size tabs; sm+ shows all.
  const [selected, setSelected] = useState(defaultTier);

  return (
    <section id="subsidy" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-leaf/25 bg-leaf/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-leaf-deep">
            <BadgeIndianRupee className="h-4 w-4" aria-hidden />
            PM Surya Ghar Muft Bijli Yojana
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-forest sm:text-4xl lg:text-[2.75rem]">
            Your exact government subsidy, at a glance
          </h2>
          <p className="mt-4 text-base leading-relaxed text-forest/65 sm:text-lg">
            The central government pays a fixed Central Financial Assistance
            amount per kW for residential rooftop solar. Naval Electronics files
            the entire application for you on the National Portal — you simply
            receive the money in your bank account.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="System size"
          className="mt-8 grid grid-cols-3 gap-1 rounded-2xl bg-forest/5 p-1 sm:hidden"
        >
          {subsidyTiers.map((tier, i) => (
            <button
              key={tier.size}
              type="button"
              role="tab"
              id={`subsidy-tab-${i}`}
              aria-selected={i === selected}
              aria-controls={`subsidy-panel-${i}`}
              onClick={() => setSelected(i)}
              className={`rounded-xl px-2 py-2.5 text-sm font-bold transition-all ${
                i === selected
                  ? "bg-white text-forest shadow-sm"
                  : "text-forest/55 hover:text-forest"
              }`}
            >
              {tier.size.replace(" kW – ", "–")}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {subsidyTiers.map((tier, i) => {
            const highlight = "highlight" in tier && tier.highlight;
            return (
              <div
                key={tier.size}
                id={`subsidy-panel-${i}`}
                className={`relative flex-col rounded-3xl border p-6 transition-shadow sm:flex sm:p-7 ${
                  i === selected ? "flex" : "hidden"
                } ${
                  highlight
                    ? "border-leaf bg-white shadow-2xl shadow-leaf/15 lg:-translate-y-2"
                    : "border-forest/10 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-leaf px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                    Most homes qualify here
                  </span>
                )}
                <div className="font-display text-xl font-extrabold text-forest">
                  {tier.size}
                </div>
                <div className="mt-1 text-sm font-medium text-forest/55">
                  {tier.bill}
                </div>

                <div className="mt-5 border-t border-forest/10 pt-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-leaf-deep">
                    Central subsidy
                  </div>
                  <div className="mt-1 font-display text-4xl font-extrabold text-leaf-deep">
                    {formatINR(tier.subsidy)}
                  </div>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-sm text-forest/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                    <span>
                      <strong className="font-semibold text-forest">
                        {tier.roof}
                      </strong>{" "}
                      shadow-free roof needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                    <span>{tier.note}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                    <span>DCR-compliant panels &amp; empanelled vendor — both mandatory, both covered</span>
                  </li>
                </ul>

                <ConsultButton
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    highlight
                      ? "bg-leaf text-white shadow-lg shadow-leaf/25 hover:bg-leaf-deep"
                      : "border-2 border-forest/15 text-forest hover:border-forest/35"
                  }`}
                >
                  Check my eligibility
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ConsultButton>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-forest/10 bg-white px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
          <FileCheck2 className="h-6 w-6 shrink-0 text-leaf" aria-hidden />
          <p className="text-sm leading-relaxed text-forest/70">
            <strong className="font-semibold text-forest">
              Subsidy is capped at ₹78,000
            </strong>{" "}
            for residential rooftop systems of 3 kW and above. Housing societies
            and group housing get ₹18,000 per kW for common-area load (up to 500
            kW). Commercial and industrial connections are not covered by CFA but
            qualify for accelerated depreciation — ask us about the industrial
            route.
          </p>
        </div>
      </div>
    </section>
  );
}
