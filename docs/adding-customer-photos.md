# Customer photos

Files dropped here are served at `/customers/<filename>`.

1. Add the photo, e.g. `deshmukh-cidco.jpg`.
2. Add or edit the matching entry in `src/lib/customers.ts`, setting
   `photo: "/customers/deshmukh-cidco.jpg"` and a descriptive `photoAlt`.
3. Rebuild and redeploy. Entries without a photo show an illustrated
   placeholder instead, so the grid never breaks.

Recommended: landscape 4:3, around 1200×900 JPEG, compressed to under 300 KB
(Squoosh or TinyPNG). The grid crops to 4:3, so keep the roof or the customer
centred.

**Take written consent** before publishing a customer's photo, name or words.
The entries currently in `src/lib/customers.ts` are sample content and must be
replaced with real, consented testimonials before the site goes live.
