import { MapPin, Quote, Star, Sun, TrendingDown } from "lucide-react";

const projects = [
  {
    title: "5 kW Residential On-Grid System",
    locality: "CIDCO N-4, Chhatrapati Sambhajinagar",
    specs: ["5 kW · Mono PERC", "500 sq. ft. roof", "Commissioned in 3 days"],
    beforeBill: "₹6,200",
    afterBill: "₹480",
    savings: "₹5,720",
    subsidy: "₹78,000 subsidy credited",
    review:
      "Our summer bill used to cross ₹6,000 with two ACs running. Naval Electronics handled the MSEDCL file and the subsidy portal end to end — we only signed where they pointed. Nine months on, the bill is basically the meter rent.",
    author: "Residential customer, CIDCO N-4",
  },
  {
    title: "3 kW Home Solar with Full Subsidy",
    locality: "Beed Bypass Road, Chhatrapati Sambhajinagar",
    specs: ["3 kW · TOPCon bifacial", "300 sq. ft. roof", "Net meter in 5 weeks"],
    beforeBill: "₹3,400",
    afterBill: "₹310",
    savings: "₹3,090",
    subsidy: "₹78,000 subsidy credited",
    review:
      "I compared three vendors. Naval were the only ones who showed me the earthing pits, the surge protection and where each cable would run before taking an order. The wiring work on the terrace is genuinely neat.",
    author: "Homeowner, Beed Bypass",
  },
  {
    title: "25 kW Commercial Rooftop Plant",
    locality: "Waluj MIDC, Chhatrapati Sambhajinagar",
    specs: ["25 kW · Bifacial array", "2,500 sq. ft. shed roof", "Accelerated depreciation claimed"],
    beforeBill: "₹31,000",
    afterBill: "₹4,100",
    savings: "₹26,900",
    subsidy: "Payback under 3 years",
    review:
      "Our fabrication unit runs a day shift, so almost every generated unit is self-consumed. The plant was installed over a weekend without stopping production, and monthly demand charges dropped immediately.",
    author: "Plant head, engineering unit, Waluj MIDC",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-ink py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-amber">
            <Sun className="h-4 w-4" aria-hidden />
            Recent Installations
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]">
            Working plants across Chhatrapati Sambhajinagar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Real systems, real bills. Here is what three recent customers pay
            Mahavitaran now.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-xl sm:p-7"
            >
              <h3 className="font-display text-lg font-extrabold leading-snug text-ink">
                {p.title}
              </h3>
              <div className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden />
                {p.locality}
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5 lg:min-h-[4.25rem]">
                {p.specs.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-cream px-2.5 py-1 text-[11px] font-bold text-ink/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-emerald/25 bg-emerald/8 p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-deep">
                  <TrendingDown className="h-3.5 w-3.5" aria-hidden />
                  Monthly saving
                </div>
                <div className="mt-1 font-display text-3xl font-extrabold leading-none text-emerald-deep">
                  {p.savings}
                </div>
                <div className="mt-2 text-xs font-semibold text-ink/55">
                  Bill went from{" "}
                  <span className="text-ink/70 line-through">{p.beforeBill}</span>{" "}
                  to <span className="font-bold text-ink">{p.afterBill}</span> /
                  month
                </div>
                <div className="mt-3 border-t border-emerald/20 pt-2.5 text-[11px] font-bold uppercase tracking-wider text-emerald-deep">
                  {p.subsidy}
                </div>
              </div>

              <div className="mt-5 flex-1">
                <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber text-amber"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink/70">
                  <Quote className="mb-1 h-4 w-4 text-ink/20" aria-hidden />
                  {p.review}
                </blockquote>
              </div>
              <div className="mt-4 border-t border-ink/10 pt-4 text-xs font-bold text-ink/50">
                — {p.author}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
