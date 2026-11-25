import { CirclePower, Cpu, Smartphone, Wrench } from "lucide-react";

const pillars = [
  {
    icon: CirclePower,
    title: "Electrical Safety First",
    body: "Naval Electronics began as an electrical contracting firm, so your plant is built to electrical code — not just bolted on. Dedicated AC and DC surge protection devices, three separate copper earthing pits with chemical backfill and pit covers, correctly derated MCB/MCCB protection and proper FR (flame-retardant) wiring throughout.",
    bullets: ["AC + DC SPD on every string", "Triple copper earthing with pit covers", "Proper FR wiring"],
  },
  {
    icon: Cpu,
    title: "Tier-1 DCR & ALMM Panels",
    body: "We install only high-efficiency Mono PERC and TOPCon bifacial modules from ALMM-listed, DCR-compliant manufacturers — the exact category required to claim your PM Surya Ghar subsidy — paired with IEC-certified inverters.",
    bullets: ["25-year performance warranty", "ALMM + DCR subsidy eligible", "GI mounting structure"],
  },
  {
    icon: Smartphone,
    title: "Smart App Monitoring",
    body: "Track daily generation, grid export and unit-level performance from your smartphone. If a string underperforms, you and our service team see it the same day — not at the end of the billing cycle.",
    bullets: ["Live generation & export data", "String-level fault alerts", "Monthly savings reports"],
  },
  {
    icon: Wrench,
    title: "Direct Service Guarantee",
    body: "Our own service team and spares, not a call centre. No ticket queue — a callback, a site visit and an on-roof fix from the engineers who installed the system in the first place.",
    bullets: ["In-house service team", "Annual maintenance contracts", "5-year workmanship warranty"],
  },
];

export default function WhyNaval() {
  return (
    <section id="why" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink/70">
            The Engineering Edge
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Why homeowners and industrial units choose Naval Electronics
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            A rooftop plant is a 25-year electrical installation on your
            building. It deserves more than a panel fitter.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, body, bullets }) => (
            <article
              key={title}
              className="group flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber/40 hover:shadow-xl sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-amber transition-colors group-hover:bg-amber group-hover:text-ink">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-extrabold text-ink">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 sm:text-[15px]">
                {body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-lg bg-cream px-2.5 py-1.5 text-xs font-semibold text-ink/70"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
