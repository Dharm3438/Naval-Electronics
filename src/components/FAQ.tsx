"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "How much government subsidy will I get under PM Surya Ghar Yojana?",
    a: "For a residential connection the central subsidy is fixed by capacity: ₹30,000 for a 1 kW system, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above — the ₹78,000 figure is a hard cap, so a 5 kW or 8 kW home system still receives ₹78,000. Group housing societies receive ₹18,000 per kW for common-area load. To qualify, the plant must use DCR-compliant, ALMM-listed modules and be installed by a vendor registered on the National Portal — both of which Naval Electronics guarantees. We register your application, upload the commissioning documents and the subsidy is credited directly to your bank account, typically within 30–45 days of net-metering.",
  },
  {
    q: "How does MSEDCL net-metering reduce my monthly bill?",
    a: "Your existing meter is replaced with a bi-directional net meter. During the day your home consumes solar power first; anything extra is exported to the Mahavitaran grid and counted as a credit in units. At night or on cloudy days you import from the grid. MSEDCL bills you only on the net difference — import minus export — and surplus credits carry forward within the settlement period. This is why a correctly sized system can cut 90% of your bill: you end up paying little more than fixed charges and meter rent.",
  },
  {
    q: "What happens during a power cut? (On-Grid vs. Hybrid)",
    a: "A standard on-grid system shuts down during a grid outage. This is a mandatory safety feature called anti-islanding — it prevents your panels from back-feeding a line that a lineman may be working on. On-grid is the cheapest option per unit and the one that qualifies for subsidy. If you need backup during load-shedding, we install a hybrid system: the same panels plus a battery bank and a hybrid inverter that keeps selected circuits — lights, fans, router, fridge — running through the outage. Hybrid costs more per kW and the battery is not subsidised, so we usually recommend on-grid for bill savings and a right-sized hybrid only where outages are frequent.",
  },
  {
    q: "How much shadow-free roof space is needed per kW?",
    a: "Plan for roughly 100 sq. ft. of genuinely shadow-free roof per kW with conventional mounting — so 300 sq. ft. for 3 kW and 500 sq. ft. for 5 kW. 'Shadow-free' matters more than total area: a water tank, parapet wall, staircase room or neighbouring building that shades the array for even two hours a day can cut a string's output sharply. Our free survey includes a 3D shading analysis across the year, and where roof space is tight we use elevated structures that keep the terrace usable underneath.",
  },
  {
    q: "What maintenance do solar panels require?",
    a: "Very little, but not zero. Panels need a water wash every 15–20 days through the dry season — dust on rooftops can cost you 10–15% of generation if left for months. Beyond that, we recommend an annual electrical check: inverter error logs, DC connector and MC4 integrity, earthing resistance, SPD status and mounting-bolt torque. Naval Electronics offers annual maintenance contracts covering cleaning and inspection, and your app monitoring will flag a drop in generation long before it shows up on your bill. Modules carry a 25-year performance warranty; inverters typically 5–10 years.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink/70">
            <HelpCircle className="h-4 w-4" aria-hidden />
            Frequently Asked Questions
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Straight answers before you invest
          </h2>
        </div>

        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-amber-deep"
                  >
                    <span className="font-display text-base font-bold leading-snug text-ink sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`mt-0.5 h-5 w-5 shrink-0 text-ink/40 transition-transform duration-200 ${
                        expanded ? "rotate-180 text-amber-deep" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  hidden={!expanded}
                  className="pb-6 pr-8"
                >
                  <p className="text-sm leading-relaxed text-ink/70 sm:text-[15px]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-ink/60">
          Still have a question about your roof or your MSEDCL connection?{" "}
          <a
            href={`tel:${site.phone}`}
            className="font-bold text-amber-deep underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
          >
            Call {site.phoneDisplay}
          </a>{" "}
          and speak to an engineer, not a call centre.
        </p>
      </div>
    </section>
  );
}
