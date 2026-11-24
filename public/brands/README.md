# Brand logos and installation photos

Files dropped here are served at `/brands/<filename>`.

1. Add the file, e.g. `waaree-logo.svg` or `waaree-install.jpg`.
2. Reference it in `src/lib/brands.ts` on that brand's entry:
   `logo: "/brands/waaree-logo.svg"` and/or `photo: "/brands/waaree-install.jpg"`.
3. Rebuild. A brand with no `logo` renders a typographic mark, and one with no
   `photo` renders a panel illustration, so the layout never breaks.

**Use official files only.** Request the logo pack from each manufacturer's
channel-partner or marketing contact. Do not copy logos off the web — brand
marks are trademarks, and most manufacturers set rules on colour, spacing and
minimum size that their own files already satisfy.

Recommended: logos as SVG or transparent PNG, around 256×256. Installation
photos as JPEG, around 1200×700, compressed to under 300 KB.
