export type PropertyType = "residential" | "commercial";

/**
 * ₹ per kW of installed rooftop capacity (turnkey). Matches the festival
 * package price: 3 kW × ₹60,000 = ₹1,80,000 (`site.offer.startingPrice`).
 */
export const COST_PER_KW = 60_000;
/** Shadow-free roof area required per kW, in square feet. */
export const SQFT_PER_KW = 100;
/** Share of the monthly bill a correctly sized rooftop system offsets. */
export const BILL_OFFSET = 0.9;

export const BILL_MIN = 1_500;
export const BILL_MAX = 100_000;
export const BILL_DEFAULT = 4_500;

/**
 * Central Financial Assistance under the PM Surya Ghar Muft Bijli Yojana.
 * Residential only: ₹30,000 for 1 kW, ₹60,000 for 2 kW, ₹78,000 for 3 kW+.
 */
export function subsidyFor(systemSize: number, propertyType: PropertyType) {
  if (propertyType !== "residential") return 0;
  if (systemSize <= 1) return 30_000;
  if (systemSize < 3) return 60_000;
  return 78_000;
}

export const subsidyTiers = [
  {
    size: "1 kW",
    subsidy: 30_000,
    roof: "100 sq. ft.",
    bill: "Up to ₹1,500 / month",
    note: "Small homes, 1–2 BHK with low load",
  },
  {
    size: "2 kW",
    subsidy: 60_000,
    roof: "200 sq. ft.",
    bill: "₹1,500 – ₹2,500 / month",
    note: "2 BHK with fridge, cooler and pump",
  },
  {
    size: "3 kW – 10 kW",
    subsidy: 78_000,
    roof: "300+ sq. ft.",
    bill: "₹3,000 and above",
    note: "Most popular — AC homes, bungalows, duplexes",
    highlight: true,
  },
] as const;

export interface SolarEstimate {
  monthlyBill: number;
  propertyType: PropertyType;
  systemSize: number;
  roofArea: number;
  grossCost: number;
  subsidy: number;
  netCost: number;
  annualSavings: number;
  monthlySavings: number;
  paybackYears: string;
  lifetimeSavings: number;
}

export function estimate(
  monthlyBill: number,
  propertyType: PropertyType,
): SolarEstimate {
  const bill = Math.min(Math.max(Math.round(monthlyBill), BILL_MIN), BILL_MAX);
  const systemSize = Math.max(1, Math.round(bill / 1100));
  const grossCost = systemSize * COST_PER_KW;
  const subsidy = subsidyFor(systemSize, propertyType);
  const netCost = grossCost - subsidy;
  const annualSavings = bill * 12 * BILL_OFFSET;

  return {
    monthlyBill: bill,
    propertyType,
    systemSize,
    roofArea: systemSize * SQFT_PER_KW,
    grossCost,
    subsidy,
    netCost,
    annualSavings,
    monthlySavings: bill * BILL_OFFSET,
    paybackYears: (netCost / annualSavings).toFixed(1),
    lifetimeSavings: annualSavings * 25,
  };
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Formats a number as Indian-grouped rupees, e.g. ₹1,95,000. */
export function formatINR(value: number) {
  return `₹${inr.format(Math.round(value))}`;
}

/** Compact rupee display for large figures, e.g. ₹12.5 Lakh. */
export function formatINRShort(value: number) {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(2)} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(2)} Lakh`;
  return formatINR(value);
}
