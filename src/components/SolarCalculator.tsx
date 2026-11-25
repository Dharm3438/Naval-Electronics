"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Calculator,
  CalendarClock,
  Home,
  IndianRupee,
  Landmark,
  PiggyBank,
  Ruler,
  Sun,
  TrendingUp,
} from "lucide-react";
import {
  BILL_DEFAULT,
  BILL_MAX,
  BILL_MIN,
  estimate,
  formatINR,
  formatINRShort,
  type PropertyType,
} from "@/lib/solar";
import { useQuote } from "./QuoteContext";

const propertyOptions: { value: PropertyType; label: string; icon: typeof Home }[] = [
  { value: "residential", label: "Residential", icon: Home },
  { value: "commercial", label: "Commercial / Industrial", icon: Building2 },
];

export default function SolarCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("residential");
  const [bill, setBill] = useState<number>(BILL_DEFAULT);
  /** Raw text while the field is being edited, so it can be cleared mid-typing. */
  const [draft, setDraft] = useState<string | null>(null);
  const { openConsult } = useQuote();

  const result = useMemo(() => estimate(bill, propertyType), [bill, propertyType]);
  const isResidential = propertyType === "residential";

  const handleBillInput = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    if (digits === "") {
      setDraft("");
      return;
    }
    const next = Math.min(Number(digits), BILL_MAX);
    setDraft(next.toLocaleString("en-IN"));
    setBill(next);
  };

  const commitBill = () => {
    setDraft(null);
    setBill((v) => Math.max(v, BILL_MIN));
  };

  return (
    <section id="calculator" className="bg-forest py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-sprout">
            <Calculator className="h-4 w-4" aria-hidden />
            Savings &amp; Subsidy Calculator
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]">
            See exactly what rooftop solar saves you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Move the slider to your average monthly MSEDCL bill. We estimate
            system size, roof area, your PM Surya Ghar subsidy and the payback
            period using real generation and pricing figures.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-8">
          {/* ---------- Inputs ---------- */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-7">
            <fieldset>
              <legend className="text-sm font-bold text-white">
                Property type
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-forest/60 p-1.5">
                {propertyOptions.map(({ value, label, icon: Icon }) => {
                  const active = propertyType === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPropertyType(value)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-center text-[13px] font-bold leading-tight transition-all ${
                        active
                          ? "bg-leaf text-white shadow-lg shadow-leaf/20"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <label
                htmlFor="monthly-bill"
                className="text-sm font-bold text-white"
              >
                Average monthly electricity bill
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/15 bg-forest/60 px-4 py-3 focus-within:border-sprout">
                <IndianRupee className="h-5 w-5 shrink-0 text-sprout" aria-hidden />
                <input
                  id="monthly-bill"
                  type="text"
                  inputMode="numeric"
                  value={draft ?? bill.toLocaleString("en-IN")}
                  onChange={(e) => handleBillInput(e.target.value)}
                  onBlur={commitBill}
                  aria-describedby="bill-range"
                  className="w-full bg-transparent font-display text-2xl font-extrabold text-white outline-none"
                />
                <span className="shrink-0 text-xs font-semibold text-white/50">
                  / month
                </span>
              </div>

              <input
                type="range"
                min={BILL_MIN}
                max={BILL_MAX}
                step={500}
                value={bill}
                onChange={(e) => {
                  setDraft(null);
                  setBill(Number(e.target.value));
                }}
                aria-label="Average monthly electricity bill in rupees"
                className="mt-6 w-full"
                style={{
                  background: `linear-gradient(to right, #5FD39A 0%, #5FD39A ${
                    ((bill - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100
                  }%, rgba(255,255,255,0.18) ${
                    ((bill - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100
                  }%, rgba(255,255,255,0.18) 100%)`,
                }}
              />
              <div
                id="bill-range"
                className="mt-2 flex justify-between text-xs font-semibold text-white/45"
              >
                <span>₹1,500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.07] p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
                  <Sun className="h-3.5 w-3.5" aria-hidden />
                  System size
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-extrabold text-sprout">
                  {result.systemSize} kW
                </dd>
              </div>
              <div className="rounded-2xl bg-white/[0.07] p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
                  <Ruler className="h-3.5 w-3.5" aria-hidden />
                  Roof area
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-extrabold text-white">
                  {result.roofArea.toLocaleString("en-IN")}
                  <span className="ml-1 text-sm font-bold text-white/55">
                    sq.ft.
                  </span>
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-white/45">
              Shadow-free area required at 100 sq. ft. per kW. Our site survey
              confirms the exact layout for your roof.
            </p>
          </div>

          {/* ---------- Results ---------- */}
          <div className="rounded-3xl bg-wash p-6 shadow-2xl sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-forest/10 bg-white p-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-forest/50">
                  Estimated system cost
                </div>
                <div className="mt-1.5 font-display text-2xl font-extrabold text-forest sm:text-[1.75rem]">
                  {formatINR(result.grossCost)}
                </div>
                <div className="mt-1 text-xs font-medium text-forest/50">
                  Turnkey, before subsidy (₹60,000 / kW)
                </div>
              </div>

              <div className="rounded-2xl border border-leaf/30 bg-leaf/10 p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-leaf-deep">
                  <Landmark className="h-3.5 w-3.5" aria-hidden />
                  {isResidential ? "PM Surya Ghar subsidy" : "Tax benefit"}
                </div>
                {isResidential ? (
                  <>
                    <div className="mt-1.5 font-display text-2xl font-extrabold text-leaf-deep sm:text-[1.75rem]">
                      − {formatINR(result.subsidy)}
                    </div>
                    <div className="mt-1 text-xs font-medium text-leaf-deep/75">
                      Credited directly to your bank account
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-1.5 font-display text-base font-extrabold leading-snug text-leaf-deep">
                      Accelerated Depreciation Tax Benefit Eligible
                    </div>
                    <div className="mt-1 text-xs font-medium text-leaf-deep/75">
                      Claim up to 40% depreciation in year one; central subsidy
                      does not apply to commercial connections.
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-forest p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-sprout">
                Your net investment after subsidy
              </div>
              <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                  {formatINR(result.netCost)}
                </span>
                {result.subsidy > 0 && (
                  <span className="pb-1 text-base font-semibold text-white/40 line-through">
                    {formatINR(result.grossCost)}
                  </span>
                )}
              </div>
              <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
                    <PiggyBank className="h-3.5 w-3.5" aria-hidden />
                    Annual savings
                  </div>
                  <div className="mt-1 font-display text-xl font-extrabold text-sprout">
                    {formatINR(result.annualSavings)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                    Payback period
                  </div>
                  <div className="mt-1 font-display text-xl font-extrabold text-white">
                    {result.paybackYears} years
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                    30-year savings
                  </div>
                  <div className="mt-1 font-display text-xl font-extrabold text-gold">
                    {formatINRShort(result.lifetimeSavings)}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() =>
                openConsult({
                  monthlyBill: result.monthlyBill,
                  systemSize: result.systemSize,
                  propertyType,
                })
              }
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf px-6 py-4 text-base font-bold text-white shadow-xl shadow-leaf/25 transition-all hover:bg-leaf-deep hover:shadow-leaf/40"
            >
              Get Quote for This {result.systemSize} kW System
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-forest/50">
              Estimates assume 90% bill offset with MSEDCL net-metering and ~4
              units per kW per day of generation. Final figures
              are confirmed after the free site survey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
