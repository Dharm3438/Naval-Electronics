# Customer review photos

Each review card shows one installation photo from the reviewer's public
review on the Naval Electronics Google Business Profile. Reviews are listed in
`src/lib/customers.ts`.

To add another review:

1. Save the reviewer's photo as `assets/customers/<name>.jpg`. This is the
   full-size original; it is not deployed.
2. Save their profile picture as `public/customers/google/<name>-avatar.png`
   (optional — without it the card shows the first letter of their name).
3. Run `npm run images`. It writes compressed copies at
   `public/customers/google/<name>-480.webp` and `-800.webp`. The card loads
   the 480 copy, or the 800 copy on high-density phone screens. Photos are
   not tappable, so no larger copy is deployed.
4. Add an entry to `reviews` in `src/lib/customers.ts` with
   `` photo: `${dir}/<name>` ``, and update `googleProfile.rating` /
   `reviewCount` if they have changed.
5. Rebuild and redeploy.

The photo is shown as a 4:3 crop; set `coverPosition` (e.g. `"bottom"`) if the
crop cuts off the panels.
