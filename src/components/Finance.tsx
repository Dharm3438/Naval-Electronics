import {
  Banknote,
  Building2,
  CalendarRange,
  CheckCircle2,
  CreditCard,
  FileText,
  Landmark,
  Percent,
  Wallet,
} from "lucide-react";

const options = [
  {
    icon: CreditCard,
    rate: "0%",
    rateNote: "No-cost EMI",
    title: "No-Cost EMI on your card",
    body: "Split the system cost across 3 to 12 months through our consumer-finance partners with no interest charged. The quickest option to approve — usually the same day — and the one most homeowners pick for systems up to 3 kW.",
    points: ["3 to 12 month tenure", "Same-day approval", "No collateral"],
    tenure: "3 – 12 months",
  },
  {
    icon: Landmark,
    rate: "From 7%",
    rateNote: "p.a. reducing",
    title: "PM Surya Ghar collateral-free loan",
    body: "The central scheme makes concessional, collateral-free bank loans available for residential rooftop systems. We prepare the file alongside your subsidy application, so one set of documents covers both.",
    points: [
      "Collateral-free for residential",
      "Subsidy application filed in parallel",
      "Longer tenure keeps EMI low",
    ],
    tenure: "Up to 10 years",
    highlight: true,
  },
  {
    icon: Banknote,
    rate: "Up to 8%",
    rateNote: "p.a. reducing",
    title: "Secured solar term loan",
    body: "For larger residential systems, housing societies and small commercial roofs that fall outside the concessional scheme. Rates sit at or below 8% per annum on a reducing balance, with tenure set so the EMI stays close to the bill you are already paying.",
    points: ["5 to 7 year tenure", "Housing societies eligible", "Part-prepayment allowed"],
    tenure: "5 – 7 years",
  },
  {
    icon: Building2,
    rate: "CAPEX",
    rateNote: "or OPEX",
    title: "Commercial & MIDC structures",
    body: "Industrial units can buy outright and claim accelerated depreciation, or take a zero-upfront OPEX route where you pay only for the units generated. We model both against your load profile before you commit.",
    points: [
      "Accelerated depreciation on CAPEX",
      "Zero-capex OPEX option",
      "Modelled against your load profile",
    ],
    tenure: "Structured per project",
  },
];

export default function Finance() {
  return (
    <section id="finance" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-emerald-deep">
            <Wallet className="h-4 w-4" aria-hidden />
            Finance Options
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Pay monthly, from 0% to 8% interest
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            The upfront cost is the usual reason people delay going solar. It
            does not have to be upfront. We arrange finance across four routes,
            and in most cases the EMI lands close to the Mahavitaran bill the
            system replaces.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {options.map(
            ({ icon: Icon, rate, rateNote, title, body, points, tenure, ...rest }) => {
              const highlight = "highlight" in rest && rest.highlight;
              return (
                <article
                  key={title}
                  className={`relative flex flex-col rounded-3xl border p-6 transition-shadow ${
                    highlight
                      ? "border-amber bg-cream shadow-2xl shadow-amber/15 lg:-translate-y-2"
                      : "border-ink/10 bg-cream shadow-sm hover:shadow-lg"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink">
                      Most popular
                    </span>
                  )}
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-amber">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="font-display text-3xl font-extrabold leading-none text-emerald-deep">
                      {rate}
                    </span>
                    <span className="pb-0.5 text-xs font-bold text-ink/50">
                      {rateNote}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink">
                    {title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink/65">
                    {body}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2 border-t border-ink/10 pt-5">
                    {points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-xs font-semibold text-ink/70"
                      >
                        <CheckCircle2
                          className="mt-px h-3.5 w-3.5 shrink-0 text-emerald"
                          aria-hidden
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-ink/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/60">
                    <CalendarRange className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {tenure}
                  </div>
                </article>
              );
            },
          )}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-ink">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-amber">
                <Percent className="h-3.5 w-3.5" aria-hidden />
                Why financing works for solar
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Your EMI replaces a bill you already pay
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                An electricity bill never ends and rises most years. A solar EMI
                ends — and once the subsidy is credited and the loan closes, the
                generation keeps running for the remaining years of the 25-year
                panel warranty. That is the whole financial case, and it is why
                we would rather finance a correctly sized system than undersize
                one to fit a cash budget.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Subsidy reduces the loan amount first",
                  "Documentation handled by us",
                  "No prepayment penalty on most products",
                ].map((t) => (
                  <li
                    key={t}
                    className="rounded-lg bg-white/[0.07] px-3 py-2 text-xs font-semibold text-white/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/[0.06] p-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
                <FileText className="h-3.5 w-3.5" aria-hidden />
                What you need to apply
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "PAN and Aadhaar",
                  "Latest MSEDCL bill for the connection",
                  "Last 6 months' bank statement",
                  "Proof of property ownership",
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-white/80">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
                      aria-hidden
                    />
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-amber px-5 py-3.5 text-sm font-bold text-ink shadow-lg shadow-amber/25 transition-all hover:bg-amber-deep"
              >
                Check my finance options
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink/50">
          Interest rates, tenure and eligibility are set by the lending partner
          and are subject to their credit approval. Rates shown are indicative
          ranges, not an offer of credit.
        </p>
      </div>
    </section>
  );
}
