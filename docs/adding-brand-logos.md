# Brand logos and installation photos

Files dropped here are served at `/brands/<filename>`.

1. Add the file, e.g. `waaree-logo.svg` or `waaree-install.jpg`.
2. Reference it in `src/lib/brands.ts` on that brand's entry:
   `logo: "/brands/waaree-logo.svg"` and/or add to `photos`:
   `{ src: "/brands/waaree-install.webp", alt: "…" }`. Crop photos to 4:3
   (960×720 WebP works well) — the first one is the card cover, and all of
   them appear in the brand's detail gallery.
3. For photos, run `npm run images`. It writes the smaller 400px and 640px
   copies to `public/brands/sized/`, which the card and gallery thumbnails
   load; the full 960px file is only loaded in the detail gallery.
4. Rebuild. A brand with no `logo` renders a typographic mark, and one with no
   `photos` renders a panel illustration, so the layout never breaks.

**Use official files only.** Request the logo pack from each manufacturer's
channel-partner or marketing contact. Do not copy logos off the web — brand
marks are trademarks, and most manufacturers set rules on colour, spacing and
minimum size that their own files already satisfy.

Recommended: logos as SVG or transparent PNG, around 256×256. Installation
photos as JPEG, around 1200×700, compressed to under 300 KB.
