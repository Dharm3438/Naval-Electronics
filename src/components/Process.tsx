import { ClipboardCheck, PencilRuler, PlugZap, Wrench } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Free Site Survey & 3D Shading Analysis",
    body: "Our engineer measures your usable roof, checks structural capacity and maps year-round shadows from water tanks, parapets and neighbouring buildings before a single panel is quoted.",
    meta: "Day 1 · No cost, no obligation",
  },
  {
    icon: PencilRuler,
    title: "Custom Engineering Design & Subsidy Application",
    body: "You get a single-line diagram, string layout and generation estimate. We register your plant on the PM Surya Ghar National Portal and file the MSEDCL application with all paperwork.",
    meta: "Week 1 · Design + documentation",
  },
  {
    icon: Wrench,
    title: "Fast, Safe Installation with Dual Earthing",
    body: "Galvanised cyclone-rated mounting structure, DC and AC surge protection, separate copper earthing pits for array and inverter, and conduit-routed cabling — installed by licensed electricians.",
    meta: "2–4 days on site",
  },
  {
    icon: PlugZap,
    title: "MSEDCL Net-Metering & Commissioning",
    body: "We coordinate the Mahavitaran inspection, net meter replacement and commissioning report, then hand over app-based monitoring and your warranty documents.",
    meta: "Subsidy credited post-commissioning",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink/70">
            How It Works
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Four steps. One accountable team.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            Survey, design, subsidy paperwork, installation and net-metering are
            all handled in-house. You never chase a separate agent for approvals.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-4 lg:gap-5">
          {steps.map(({ icon: Icon, title, body, meta }, i) => (
            <li
              key={title}
              className="relative flex flex-col rounded-3xl border border-ink/10 bg-cream p-6 lg:p-6"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-12 hidden h-0.5 w-6 bg-ink/15 lg:block"
                />
              )}
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-amber">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-display text-4xl font-extrabold leading-none text-ink/12">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink/65">
                {body}
              </p>
              <div className="mt-5 inline-flex rounded-lg bg-emerald/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-deep">
                {meta}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
