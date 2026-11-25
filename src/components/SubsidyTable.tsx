import { ArrowRight, BadgeIndianRupee, CheckCircle2, FileCheck2 } from "lucide-react";
import { formatINR, subsidyTiers } from "@/lib/solar";
import ConsultButton from "./ConsultButton";

export default function SubsidyTable() {
  return (
    <section id="subsidy" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-emerald-deep">
            <BadgeIndianRupee className="h-4 w-4" aria-hidden />
            PM Surya Ghar Muft Bijli Yojana
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Your exact government subsidy, at a glance
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            The central government pays a fixed Central Financial Assistance
            amount per kW for residential rooftop solar. Naval Electronics files
            the entire application for you on the National Portal — you simply
            receive the money in your bank account.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subsidyTiers.map((tier) => {
            const highlight = "highlight" in tier && tier.highlight;
            return (
              <div
                key={tier.size}
                className={`relative flex flex-col rounded-3xl border p-6 transition-shadow sm:p-7 ${
                  highlight
                    ? "border-amber bg-white shadow-2xl shadow-amber/15 lg:-translate-y-2"
                    : "border-ink/10 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink">
                    Most homes qualify here
                  </span>
                )}
                <div className="font-display text-xl font-extrabold text-ink">
                  {tier.size}
                </div>
                <div className="mt-1 text-sm font-medium text-ink/55">
                  {tier.bill}
                </div>

                <div className="mt-5 border-t border-ink/10 pt-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-deep">
                    Central subsidy
                  </div>
                  <div className="mt-1 font-display text-4xl font-extrabold text-emerald-deep">
                    {formatINR(tier.subsidy)}
                  </div>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-sm text-ink/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden />
                    <span>
                      <strong className="font-semibold text-ink">
                        {tier.roof}
                      </strong>{" "}
                      shadow-free roof needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden />
                    <span>{tier.note}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden />
                    <span>DCR-compliant panels &amp; empanelled vendor — both mandatory, both covered</span>
                  </li>
                </ul>

                <ConsultButton
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    highlight
                      ? "bg-amber text-ink shadow-lg shadow-amber/25 hover:bg-amber-deep"
                      : "border-2 border-ink/15 text-ink hover:border-ink/35"
                  }`}
                >
                  Check my eligibility
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ConsultButton>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
          <FileCheck2 className="h-6 w-6 shrink-0 text-amber" aria-hidden />
          <p className="text-sm leading-relaxed text-ink/70">
            <strong className="font-semibold text-ink">
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
