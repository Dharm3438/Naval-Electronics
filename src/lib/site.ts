/**
 * Central business configuration for Naval Electronics.
 *
 * ⚠️ REPLACE THE FOUR PLACEHOLDER VALUES BELOW WITH THE REAL DETAILS
 * before this site goes live. They are the only values in the codebase
 * that are not production-ready.
 *   - phone        : 10-digit landline/mobile in E.164 form
 *   - whatsapp     : 91 + 10-digit number, digits only (used in wa.me links)
 *   - email        : public enquiries inbox
 *   - address      : full office address incl. pincode
 */
export const site = {
  name: "Naval Electronics",
  tagline: "Engineered Rooftop Solar & Electrical Solutions",
  city: "Chhatrapati Sambhajinagar",
  cityAlt: "Aurangabad",
  region: "Marathwada, Maharashtra",

  // --- REPLACE ---
  phone: "+919000000000",
  phoneDisplay: "+91 90000 00000",
  whatsapp: "919000000000",
  email: "enquiry@navalelectronics.in",
  address: {
    line1: "Naval Electronics, Solar & Electrical Division",
    line2: "Jalna Road, Chhatrapati Sambhajinagar (Aurangabad)",
    line3: "Maharashtra 431001, India",
  },
  // --- /REPLACE ---

  hours: "Mon – Sat, 9:30 AM – 7:30 PM",
  url: "https://navalelectronics.in",
} as const;

export const navLinks = [
  { label: "Calculator", href: "#calculator" },
  { label: "Subsidy", href: "#subsidy" },
  { label: "Finance", href: "#finance" },
  { label: "Process", href: "#process" },
  { label: "Brands", href: "#brands" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#customers" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Builds a wa.me deep link with a pre-filled message. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
