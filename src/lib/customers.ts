/**
 * Satisfied-customer gallery entries.
 *
 * ⚠️ SAMPLE CONTENT — replace before launch.
 * These names, photos and reviews are placeholders written to show the layout.
 * Publishing invented testimonials is misleading and, for a consumer-facing
 * business, legally risky. Replace each entry with a real customer, and take
 * written consent before using their photo, name or words.
 *
 * To add a customer:
 *   1. Drop a photo into `public/customers/` (landscape 4:3 works best, around
 *      1200×900, under 300 KB — compress with Squoosh or TinyPNG first).
 *   2. Add an entry below with `photo: "/customers/<filename>"`.
 *   3. Rebuild and redeploy. Entries without a photo render an illustrated
 *      placeholder, so the layout never breaks.
 */
export interface Customer {
  name: string;
  locality: string;
  system: string;
  /** Path under /public — omit for the illustrated placeholder. */
  photo?: string;
  /** Alt text describing the photo, for screen readers. */
  photoAlt?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  savings: string;
}

export const customers: Customer[] = [
  {
    name: "Deshmukh family",
    locality: "CIDCO N-4",
    system: "5 kW residential on-grid",
    rating: 5,
    review:
      "The team arrived when they said they would and finished in three days without leaving a mess on the terrace. What impressed me most was the paperwork — the subsidy reached my account without me visiting a single office.",
    savings: "₹5,720 / month",
  },
  {
    name: "Kulkarni residence",
    locality: "Beed Bypass Road",
    system: "3 kW with ₹78,000 subsidy",
    rating: 5,
    review:
      "I had quotes from three companies. Naval were the only ones who explained the earthing and surge protection instead of only talking about panel brands. A year later there has not been a single service call.",
    savings: "₹3,090 / month",
  },
  {
    name: "Shree Ganesh Industries",
    locality: "Waluj MIDC",
    system: "25 kW commercial rooftop",
    rating: 5,
    review:
      "Installation happened over a weekend so our production never stopped. The monitoring app means our maintenance team can see generation every morning without climbing to the shed roof.",
    savings: "₹26,900 / month",
  },
  {
    name: "Sai Residency Society",
    locality: "Garkheda",
    system: "10 kW housing society common load",
    rating: 5,
    review:
      "Lifts, pumps and corridor lights now run largely on solar, so the monthly maintenance collection from members has come down. The committee approved the second phase on the strength of the first year's numbers.",
    savings: "₹9,400 / month",
  },
  {
    name: "Pathan household",
    locality: "Jalna Road",
    system: "4 kW hybrid with battery backup",
    rating: 5,
    review:
      "We wanted backup during outages, not only a lower bill. They specified a hybrid inverter honestly, including the parts the subsidy does not cover, instead of overselling. The fans and fridge stay on now.",
    savings: "₹4,050 / month",
  },
  {
    name: "Joshi bungalow",
    locality: "Shahnoorwadi",
    system: "6 kW residential on-grid",
    rating: 5,
    review:
      "Two air conditioners used to make our summer bills painful. The first full summer on solar, the bill stayed under ₹600. The cabling work on the terrace is tidy enough that I show it to visitors.",
    savings: "₹6,840 / month",
  },
];
