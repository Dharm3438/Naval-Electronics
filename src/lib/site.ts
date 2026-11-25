/**
 * Central business configuration for Naval Electronics.
 *
 * The site deliberately avoids naming a city or service region in its copy so
 * the offer reads the same wherever a visitor lands from. The office address
 * appears only as a contact detail.
 *
 * ⚠️ `email` is still a placeholder — replace it with the real inbox.
 */
export const site = {
  name: "Naval Electronics",
  tagline: "Engineered Rooftop Solar & Electrical Solutions",

  /** Primary sales line — used for every Call and WhatsApp button. */
  phone: "+917620693195",
  phoneDisplay: "+91 76206 93195",
  whatsapp: "917620693195",
  /** Office landline / second number, shown in the footer. */
  officePhone: "+919975701977",
  officePhoneDisplay: "+91 99757 01977",
  email: "enquiry@navalelectronics.in",
  address: {
    line1: "Ganesh Cross Road, beside Naik Photo Studio",
    line2: "Hanuman Wadi, Chalisgaon",
    line3: "Maharashtra 424101, India",
    locality: "Chalisgaon",
    postalCode: "424101",
  },
  /** Google Business Profile — same link as `googleProfile.url` in customers.ts. */
  mapsUrl: "https://maps.app.goo.gl/bh6oWsYXUJ5tyeg46",

  /**
   * Hero banner photo. Drop the final image into `public/hero/` and set the
   * path here (e.g. "/hero/banner.jpg", ideally 2400×1200 or wider). While it
   * is empty the hero renders a designed placeholder scene instead.
   */
  heroBanner: {
    src: "" as string,
    alt: "Rooftop solar installation by Naval Electronics",
  },

  hours: "Mon – Sat, 9:30 AM – 8:00 PM",
  url: "https://navalelectronics.in",
  /**
   * Festival offer from the hero poster. The deadline banner hides itself
   * automatically once `registrationCloses` has passed (end of day, IST).
   */
  offer: {
    label: "Festival Special Offer",
    registrationCloses: "2026-12-15T23:59:59+05:30",
    registrationClosesDisplay: "15 December",
    startingPrice: 180_000,
  },
} as const;

export const navLinks = [
  { label: "Brands", href: "#brands" },
  { label: "Reviews", href: "#customers" },
  { label: "Subsidy", href: "#subsidy" },
  { label: "Process", href: "#process" },
  { label: "Finance", href: "#finance" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Builds a wa.me deep link with a pre-filled message. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
