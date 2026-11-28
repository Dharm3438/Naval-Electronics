# Brand logos and installation photos

Each brand has at most one logo and one photo.

**Logo:** save it as `public/brands/<name>-logo.svg` (served at
`/brands/<name>-logo.svg`) and set `logo: "/brands/<name>-logo.svg"` on the
brand's entry in `src/lib/brands.ts`.

**Photo:**

1. Crop it to 4:3 (960×720 works well) and save it as
   `assets/brands/<name>.webp`. This is the original; it is not deployed.
2. Run `npm run images`. It writes compressed copies at
   `public/brands/<name>-400.webp` and `-640.webp`, which the card and the
   detail dialog load.
3. Set `photo: { src: "/brands/<name>", alt: "…" }` on the brand's entry.

Rebuild afterwards. A brand with no `logo` renders a typographic mark, and one
with no `photo` renders a panel illustration, so the layout never breaks.

**Use official files only.** Request the logo pack from each manufacturer's
channel-partner or marketing contact. Do not copy logos off the web — brand
marks are trademarks, and most manufacturers set rules on colour, spacing and
minimum size that their own files already satisfy.

Recommended: logos as SVG or transparent PNG, around 256×256. Installation
photos as JPEG, around 1200×700, compressed to under 300 KB.
