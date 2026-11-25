# Customer review photos

`public/customers/google/` holds the photos and profile pictures from the
public reviews on the Naval Electronics Google Business Profile, served at
`/customers/google/<file>`. They are listed in `src/lib/customers.ts`.

To add another review:

1. Save the reviewer's photos as `public/customers/google/<name>-1.jpg`,
   `-2.jpg`, … and their profile picture as `<name>-avatar.png` (optional —
   without it the card shows the first letter of their name).
2. Add an entry to `reviews` in `src/lib/customers.ts`, and update
   `googleProfile.rating` / `reviewCount` if they have changed.
3. Rebuild and redeploy.

The first photo is the card's 4:3 cover; up to three more show as thumbnails.
