# Naval Electronics — Rooftop Solar Landing Page

A high-converting, fully responsive marketing site for **Naval Electronics**, a
rooftop solar installation and electrical solutions firm. Site copy is kept
location-neutral; the office (Chalisgaon, Maharashtra) appears only as a
contact detail.

## ⚠️ Before going live

Three things need checking before this is published.

**1. Contact details** — set in `src/lib/site.ts`. Phone, WhatsApp, address and
hours are real; `email` is still a placeholder.

| Field      | Used by                                             |
| ---------- | --------------------------------------------------- |
| `phone` / `phoneDisplay` | Navbar, FAQ, consultation popup, footer `tel:` links |
| `whatsapp` | Every `wa.me` link (floating button, consultation popup, footer) — must be `91` + 10 digits, digits only |
| `email`    | Footer `mailto:` links                              |
| `address`  | Footer address block and the JSON-LD business schema |

Also confirm `site.url` (used for canonical + OpenGraph URLs).

The festival offer (label, 15 December registration deadline, ₹1,80,000
starting price) lives in `site.offer`. The deadline banner hides itself after
the date; update or remove `site.offer` for the next campaign.

**2. Customer reviews** — the entries in `src/lib/customers.ts` are real
reviews copied from the Naval Electronics Google Business Profile, with the
reviewers' photos saved in `public/customers/google/`. Update `googleProfile`
there when the rating or review count changes.

**3. Brand logos and copy** — `src/lib/brands.ts` carries no logo files. Request
official logo packs from each manufacturer's channel-partner contact, drop them
in `public/brands/`, and set the `logo` path. Confirm each brand's product and
warranty lines against its current datasheet; they are written from general
category positioning, not from a specific model sheet.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** (design tokens declared in `src/app/globals.css`)
- **Lucide React** icons
- `next/font/google`: Plus Jakarta Sans (headings) + Inter (body)
- No backend required — leads are handed off via a pre-filled WhatsApp deep link

## Run it locally

Requires Node.js 20.9 or newer (check with `node -v`).

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. The dev server hot-reloads on save.

The "Get Free Consultation" form saves each request as a row in a shared
Google Sheet. Set `NEXT_PUBLIC_LEADS_ENDPOINT` before building; see
[docs/lead-sheet-setup.md](docs/lead-sheet-setup.md).

To produce the deployable files:

```bash
npm run build
```

That writes a complete static site into `out/`. To preview exactly what will be
deployed, serve that folder with any static file server:

```bash
npx serve out
```

Lint and type-check:

```bash
npm run lint
```

## Is this static, and is there a backend?

**It is a fully static site, and there is no backend.** `next.config.ts` sets
`output: "export"`, so `npm run build` produces plain `.html`, `.css`, `.js`
and image files in `out/`. Nothing needs Node.js at runtime — the calculator,
FAQ accordion, mobile drawer and consultation popup all run in the visitor's browser.

That means it can be hosted anywhere that serves files, including cheap shared
hosting. Form submissions are handed to WhatsApp via a `wa.me` deep link rather
than stored in a database, which is why no server is required.

If you later want submissions saved to a database or emailed, that is when a
backend becomes necessary — see "Adding a backend later" below.

## Deploying

### Hostinger (shared hosting / hPanel)

1. `npm run build` locally.
2. Open hPanel → **File Manager** → `public_html`.
3. Upload the **contents** of `out/` (not the `out` folder itself) so that
   `index.html` sits directly inside `public_html`.
4. Point your domain at it (see "Domain from GoDaddy" below).

No Node.js setup, no `npm start` on the server. Re-deploying is just a rebuild
and re-upload; automate it with Hostinger's Git deployment if you prefer.

### Render (recommended)

`render.yaml` in the repo root is a Blueprint, so Render configures itself:

1. Sign in at [dashboard.render.com](https://dashboard.render.com) with GitHub.
2. **New → Blueprint**, pick this repository, approve the plan it shows.
3. Done. Render builds on every push to `main`.

It serves the site at a free `*.onrender.com` subdomain with an automatic
Let's Encrypt certificate — HTTPS works from the first deploy, before you point
a custom domain at it.

If you would rather click through manually, create a **Static Site** (not a Web
Service) with build command `npm ci && npm run build` and publish directory
`out`. A Web Service costs money and gains nothing here: there is no server
code to run.

### Vercel / Netlify / Cloudflare Pages

Connect the repo and accept the defaults — all three detect Next.js. Build
command `npm run build`, output directory `out`.

### Domain from GoDaddy

Buy the domain at GoDaddy, then change its DNS to point at the host. You do
**not** need to move the domain itself.

- **Render:** add the custom domain in the Render dashboard, then in GoDaddy's
  DNS manager add the `CNAME` (for `www`) and `A` record (for the root domain)
  that Render shows you.
- **Hostinger:** either change GoDaddy's nameservers to Hostinger's, or add an
  `A` record pointing to the IP shown in hPanel.

DNS changes take anywhere from a few minutes to a few hours to propagate. Both
hosts issue a free Let's Encrypt HTTPS certificate automatically once the
domain resolves to them.

After the domain is live, update `site.url` in `src/lib/site.ts` so the
canonical and OpenGraph URLs are correct, and rebuild.

## Why not WordPress?

WordPress is a reasonable choice for a site whose content the owner edits daily
without a developer. For this page it would be a step backwards:

| | This site | WordPress |
| --- | --- | --- |
| Hosting | Any static host, free tiers available | PHP + MySQL hosting required |
| Speed | Prerendered HTML, no database queries | Database query per page view |
| The savings calculator | Purpose-built, exact PM Surya Ghar tiers | Needs a custom plugin or paid form builder |
| Maintenance | None — static files do not get hacked | Core, theme and plugin updates; a known attack target |
| Editing copy | Edit a `.tsx` file and rebuild | Visual editor in the browser |

The honest trade-off is that last row: changing text here means editing code and
redeploying. If Naval Electronics wants to edit copy and add project photos
without a developer, the better answer is not WordPress but a headless CMS
(Sanity, Contentful or Prismic) wired into this same codebase — the design,
calculator and performance all stay as they are.

## Adding a backend later

Leads currently go out over WhatsApp only. To also capture them server-side:

1. Remove `output: "export"` from `next.config.ts`.
2. Add a route handler at `src/app/api/leads/route.ts`.
3. In `ConsultationModal.tsx`'s `handleSubmit`, `await fetch("/api/leads", ...)` with the
   `FormState` object before calling `setSubmitted`.
4. Deploy to Vercel, or to Render as a **Web Service** with start command
   `npm run start`.

A no-code alternative that keeps the site static: point the form at Formspree,
Web3Forms or a Google Apps Script endpoint, all of which accept a POST from the
browser and email you the lead.

## Structure

```
src/
├── app/
│   ├── layout.tsx      fonts, SEO metadata, OpenGraph/Twitter cards
│   ├── page.tsx        section composition + LocalBusiness JSON-LD
│   └── globals.css     colour tokens, typography, slider styling
├── components/
│   ├── Navbar.tsx            sticky nav + mobile drawer
│   ├── Hero.tsx              full-width banner, 0% EMI offer, consultation CTA
│   ├── RooftopIllustration.tsx  custom SVG rooftop visual
│   ├── SolarCalculator.tsx   interactive savings + subsidy calculator
│   ├── SubsidyTable.tsx      PM Surya Ghar tier breakdown
│   ├── Finance.tsx           0%–8% finance options
│   ├── Process.tsx           4-step turnkey process
│   ├── WhyNaval.tsx          engineering/quality differentiators
│   ├── Brands.tsx            manufacturer cards + detail dialog
│   ├── BrandVisual.tsx       logo fallback mark and panel illustration
│   ├── Customers.tsx         satisfied-customer photo gallery
│   ├── FAQ.tsx               accessible accordion
│   ├── ConsultationModal.tsx free-consultation popup: lead capture + WhatsApp hand-off
│   ├── ConsultButton.tsx     any button that opens the consultation popup
│   ├── WhatsAppButton.tsx    floating quick-chat button
│   ├── Footer.tsx            contact, service areas, quick links
│   ├── QuoteContext.tsx      popup open state + calculator prefill
│   ├── CopyrightYear.tsx     client-rendered footer year
│   └── Logo.tsx              sun/circuit wordmark
└── lib/
    ├── site.ts         business details + wa.me helper  ← EDIT THIS
    ├── brands.ts       manufacturer data               ← EDIT THIS
    ├── customers.ts    Google reviews shown on the page
    └── solar.ts        sizing, costing, subsidy and payback maths

public/
├── brands/      logo and installation image files
└── customers/   Google review photos and avatars

docs/
├── adding-brand-logos.md
└── adding-customer-photos.md
```

## Adding customer photos and brand logos

Step-by-step in [`docs/adding-customer-photos.md`](docs/adding-customer-photos.md)
and [`docs/adding-brand-logos.md`](docs/adding-brand-logos.md). In short: drop
the file into `public/customers/` or `public/brands/`, point the matching entry
in `src/lib/customers.ts` or `src/lib/brands.ts` at it, rebuild, redeploy.
Entries with no image render a designed placeholder, so the layout never breaks
while you gather photos.

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

Every call-to-action opens the same consultation popup. It validates
client-side (3+ character name, `[6-9]` + 9 digits mobile, monthly bill, city,
6-digit pincode) and shows a confirmation panel with the submitted details. Because there is no database, every submission also offers a
**Send on WhatsApp** button that opens `wa.me` with the enquiry
pre-filled, so no lead is lost. To add server-side persistence later, post the
`FormState` object in `ConsultationModal.tsx`'s `handleSubmit` to a route handler before
calling `setSubmitted`.
