# Naval Electronics — Rooftop Solar Landing Page

A high-converting, fully responsive marketing site for **Naval Electronics**, a
rooftop solar installation and electrical solutions firm serving Chhatrapati
Sambhajinagar (Aurangabad) and the wider Marathwada region of Maharashtra.

## ⚠️ Before going live

All business copy is production-ready. **Four contact values are placeholders**
and must be replaced — they live in one place, `src/lib/site.ts`:

| Field      | Used by                                             |
| ---------- | --------------------------------------------------- |
| `phone` / `phoneDisplay` | Navbar, FAQ, lead form, footer `tel:` links |
| `whatsapp` | Every `wa.me` link (floating button, lead form, footer) — must be `91` + 10 digits, digits only |
| `email`    | Lead form and footer `mailto:` links                |
| `address`  | Footer address block and the JSON-LD business schema |

Also update `site.url` (used for canonical + OpenGraph URLs) and the
`postalCode` in the JSON-LD schema in `src/app/page.tsx`.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** (design tokens declared in `src/app/globals.css`)
- **Lucide React** icons
- `next/font/google`: Plus Jakarta Sans (headings) + Inter (body)
- No backend required — leads are handed off via a pre-filled WhatsApp deep link

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm run start
```

```bash
npm run lint
```

## Structure

```
src/
├── app/
│   ├── layout.tsx      fonts, SEO metadata, OpenGraph/Twitter cards
│   ├── page.tsx        section composition + LocalBusiness JSON-LD
│   └── globals.css     colour tokens, typography, slider styling
├── components/
│   ├── Navbar.tsx            sticky nav + mobile drawer
│   ├── Hero.tsx              headline, CTAs, trust strip, live savings badge
│   ├── RooftopIllustration.tsx  custom SVG hero visual
│   ├── SolarCalculator.tsx   interactive savings + subsidy calculator
│   ├── SubsidyTable.tsx      PM Surya Ghar tier breakdown
│   ├── Process.tsx           4-step turnkey process
│   ├── WhyNaval.tsx          engineering/quality differentiators
│   ├── Projects.tsx          local case studies with reviews
│   ├── FAQ.tsx               accessible accordion
│   ├── LeadForm.tsx          validated lead capture + WhatsApp hand-off
│   ├── WhatsAppButton.tsx    floating quick-chat button
│   ├── Footer.tsx            contact, service areas, quick links
│   ├── QuoteContext.tsx      calculator → lead form hand-off
│   ├── CopyrightYear.tsx     client-rendered footer year
│   └── Logo.tsx              sun/circuit wordmark
└── lib/
    ├── site.ts         business details + wa.me helper  ← EDIT THIS
    └── solar.ts        sizing, costing, subsidy and payback maths
```

## Calculator assumptions

| Input / output        | Rule                                              |
| --------------------- | ------------------------------------------------- |
| System size           | `max(1, round(monthlyBill / 1100))` kW            |
| Shadow-free roof area | `systemSize × 100` sq. ft.                        |
| Cost before subsidy   | `systemSize × ₹65,000`                            |
| PM Surya Ghar subsidy | 1 kW → ₹30,000 · 2 kW → ₹60,000 · 3 kW+ → ₹78,000 (residential only) |
| Commercial            | No CFA — surfaced as accelerated depreciation eligibility |
| Annual savings        | `monthlyBill × 12 × 0.90`                         |
| Payback               | `netCost / annualSavings`, one decimal place      |

These live in `src/lib/solar.ts` as named constants so pricing can be tuned in
one place as module and installation rates move.

## Lead handling

The form validates client-side (3+ character name, `[6-9]` + 9 digits mobile,
locality/pincode) and shows a confirmation panel with an indicative system
summary. Because there is no database, every submission also offers a
**Send Details via WhatsApp** button that opens `wa.me` with the enquiry
pre-filled, so no lead is lost. To add server-side persistence later, post the
`FormState` object in `LeadForm.tsx`'s `handleSubmit` to a route handler before
calling `setSubmitted`.
