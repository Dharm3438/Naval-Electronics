import { ClipboardCheck, PlugZap, ReceiptText, Wrench } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Free Site Survey",
    body: "Our engineer visits your home, measures the usable roof, checks structural capacity and notes any shade from water tanks, parapets or neighbouring buildings before a single panel is quoted.",
    meta: "Day 1 · No cost, no obligation",
  },
  {
    icon: ReceiptText,
    title: "Detailed, In-Depth Quotation",
    body: "A transparent, itemised quotation with every material spelled out — panel and inverter make and model, structure, DC and AC cables, earthing, surge protection and balance of system — plus the expected generation and your subsidy amount. No hidden extras.",
    meta: "Week 1 · Itemised materials",
  },
  {
    icon: Wrench,
    title: "Fast Documentation & Safe Installation with Triple Earthing",
    body: "We file the PM Surya Ghar and MSEDCL paperwork for you, then install on a galvanised mounting structure with three separate copper earthing pits, each finished with a pit cover, DC and AC surge protection and proper FR wiring — by trained electricians.",
    meta: "2–4 days on site",
  },
  {
    icon: PlugZap,
    title: "MSEDCL Net-Metering & Commissioning",
    body: "We coordinate with the Mahavitaran inspection team for net meter replacement and the commissioning report. Once they verify all your documents, we start your solar system on the government-provided net meter.",
    meta: "Subsidy credited post-commissioning",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-forest/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-forest/70">
            How It Works
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-forest sm:text-4xl lg:text-[2.75rem]">
            Four steps. One accountable team.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-forest/65 sm:text-lg">
            Survey, quotation, subsidy paperwork, installation and net-metering
            are all handled in-house. You never chase a separate agent for approvals.
          </p>
        </div>

        {/* Phones and tablets: a vertical timeline. Desktop: four cards. */}
        <ol className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-4 lg:gap-5">
          {steps.map(({ icon: Icon, title, body, meta }, i) => (
            <li
              key={title}
              className="relative flex flex-col pl-16 lg:rounded-3xl lg:border lg:border-forest/10 lg:bg-wash lg:p-6"
            >
              {/* Timeline line on phones and tablets */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -bottom-8 left-[1.3125rem] top-14 w-0.5 bg-gradient-to-b from-leaf/60 to-forest/10 lg:hidden"
                />
              )}
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-12 hidden h-0.5 w-6 bg-forest/15 lg:block"
                />
              )}
              <div className="flex min-h-11 items-center gap-3">
                <span className="absolute left-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-sprout lg:static">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-leaf-deep lg:hidden">
                  Step {i + 1}
                </span>
                <span className="hidden font-display text-4xl font-extrabold leading-none text-forest/12 lg:inline">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-1 font-display text-lg font-bold leading-snug text-forest lg:mt-5">
                {title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-forest/65">
                {body}
              </p>
              <div className="mt-4 inline-flex self-start rounded-lg lg:mt-5 lg:self-auto bg-leaf/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-leaf-deep">
                {meta}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
