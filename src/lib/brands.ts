/**
 * Manufacturer brands Naval Electronics supplies and installs.
 *
 * ⚠️ REVIEW BEFORE LAUNCH
 * 1. `logo` — drop the official logo file supplied by each manufacturer into
 *    `public/brands/` and set the path here. Until then a typographic mark is
 *    rendered. Do not use logos scraped from the web; request the brand's
 *    press-kit file or written permission as a channel partner.
 * 2. `photo` — an installation photo of that brand's modules on one of your
 *    own sites, in `public/brands/`. Falls back to a panel illustration.
 * 3. Product and warranty lines reflect general category positioning. Confirm
 *    against each manufacturer's current datasheet before publishing.
 */
export interface Brand {
  slug: string;
  name: string;
  /** Short line shown on the card. */
  tagline: string;
  /** Initials used by the fallback typographic mark. */
  initials: string;
  /** Accent colour for the mark and panel illustration. */
  accent: string;
  /** Official logo in /public/brands — falls back to the typographic mark. */
  logo?: string;
  /** Installation photo in /public/brands — falls back to an illustration. */
  photo?: string;
  category: string;
  about: string;
  products: string[];
  warranty: string;
  bestFor: string;
}

export const brands: Brand[] = [
  {
    slug: "waaree",
    name: "Waaree Energies",
    tagline: "India's most widely installed module brand",
    initials: "WE",
    accent: "#E11D48",
    category: "Solar modules",
    about:
      "One of India's largest solar module manufacturers, with an ALMM-listed, DCR-compliant range that covers both subsidised residential rooftops and large commercial plants. Their distribution and service footprint across Maharashtra is the widest of any brand we carry, which matters when a module needs replacing eight years from now.",
    products: [
      "N-type TOPCon bifacial modules",
      "Mono PERC half-cut modules",
      "DCR series for PM Surya Ghar subsidy",
    ],
    warranty: "25-year performance · 12-year product warranty",
    bestFor: "Residential rooftops claiming subsidy, and large MIDC plants",
  },
  {
    slug: "tata-power-solar",
    name: "Tata Power Solar",
    tagline: "The trust benchmark for Indian homes",
    initials: "TP",
    accent: "#1D4ED8",
    category: "Solar modules & cells",
    about:
      "One of the oldest solar manufacturers in India and the brand most homeowners name first. Tata Power Solar's cell capacity is enlisted under ALMM, so its modules remain eligible for the residential subsidy. Customers who want a name their family already trusts, with a nationwide service structure behind it, usually land here.",
    products: [
      "N-type TOPCon modules",
      "Mono PERC modules",
      "Integrated rooftop solutions",
    ],
    warranty: "25-year performance · 12-year product warranty",
    bestFor: "Homeowners prioritising brand assurance and resale value",
  },
  {
    slug: "adani-solar",
    name: "Adani Solar",
    tagline: "Fully integrated cell-to-module manufacturing",
    initials: "AS",
    accent: "#0F766E",
    category: "Solar modules & cells",
    about:
      "Adani's Mundra facility in Gujarat is one of the few in India making both cells and modules under one roof, and its cell capacity is enlisted under ALMM List-II. That vertical integration shows up as consistent supply and short lead times — useful when a commercial project cannot wait on an import queue.",
    products: [
      "N-type TOPCon bifacial modules",
      "Mono PERC modules",
      "DCR cells and modules",
    ],
    warranty: "25-year performance · 12-year product warranty",
    bestFor: "Commercial and industrial rooftops needing bulk supply",
  },
  {
    slug: "premier-energies",
    name: "Premier Energies",
    tagline: "ALMM-listed cells made in Hyderabad",
    initials: "PE",
    accent: "#7C3AED",
    category: "Solar modules & cells",
    about:
      "A Hyderabad-based manufacturer of both solar cells and modules, enlisted on ALMM List-II for cells. Their domestic cell production is what makes genuinely DCR-compliant modules possible, which is a hard requirement for PM Surya Ghar subsidy claims rather than a marketing line.",
    products: [
      "N-type TOPCon cells and modules",
      "Mono PERC modules",
      "DCR-compliant subsidy range",
    ],
    warranty: "25-year performance · 12-year product warranty",
    bestFor: "Subsidy-backed residential and housing-society systems",
  },
  {
    slug: "vikram-solar",
    name: "Vikram Solar",
    tagline: "N-type TOPCon specialists",
    initials: "VS",
    accent: "#EA580C",
    category: "Solar modules",
    about:
      "A Kolkata-headquartered manufacturer that moved early to n-type TOPCon, the technology now replacing PERC across the Indian market. TOPCon modules hold output better at the high roof temperatures we see through a Marathwada summer and degrade more slowly over the 25-year life.",
    products: [
      "N-type TOPCon bifacial modules",
      "High-efficiency large-format modules",
      "Mono PERC modules",
    ],
    warranty: "25-year performance · 12-year product warranty",
    bestFor: "Tight roofs needing maximum generation per square foot",
  },
  {
    slug: "reliance-solar",
    name: "Reliance Solar",
    tagline: "New-generation giga-scale manufacturing",
    initials: "RS",
    accent: "#1E3A8A",
    category: "Solar modules",
    about:
      "Reliance's New Energy business is building fully integrated module manufacturing at its Jamnagar giga-complex, with heterojunction technology at the core of the roadmap. We offer it to customers who want the newest cell architecture available from an Indian producer.",
    products: [
      "Heterojunction (HJT) modules",
      "N-type high-efficiency modules",
      "Integrated rooftop packages",
    ],
    warranty: "25-year performance · product warranty per current datasheet",
    bestFor: "Early adopters wanting the latest cell technology",
  },
  {
    slug: "utl-solar",
    name: "UTL Solar",
    tagline: "Inverters, PCUs and hybrid backup",
    initials: "UTL",
    accent: "#B45309",
    category: "Inverters & hybrid systems",
    about:
      "UTL is best known on the electrical side rather than the panel side — solar inverters, PCUs and hybrid charge controllers. When a customer in a load-shedding pocket wants backup through an outage rather than only a lower bill, a UTL hybrid inverter paired with a battery bank is usually what we specify.",
    products: [
      "On-grid and hybrid solar inverters",
      "Solar PCUs and charge controllers",
      "Off-grid and backup systems",
    ],
    warranty: "Manufacturer warranty per model, typically 2–5 years",
    bestFor: "Homes and shops needing power through MSEDCL outages",
  },
];
