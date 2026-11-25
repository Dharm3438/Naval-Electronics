/**
 * Customer reviews shown in the "Satisfied Customers" section.
 *
 * Source: the Naval Electronics Google Business Profile
 * (see `googleProfile.url` below). Names, star ratings, review text and
 * photos are copied from the public reviews there; files live in
 * `public/customers/google/`.
 *
 * To add another review:
 *   1. Save the reviewer's photos to `public/customers/google/<name>-<n>.jpg`
 *      and their profile picture to `<name>-avatar.<ext>` (optional).
 *   2. Add an entry below.
 *   3. Rebuild and redeploy.
 *
 * Text is kept as the reviewer wrote it (Hinglish included); only pasted
 * WhatsApp timestamps were removed.
 */
export interface Review {
  name: string;
  /** Profile picture path under /public. Omit to show the initial. */
  avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Relative date as Google showed it when the review was copied. */
  date: string;
  review: string;
  /** Photo paths under /public. The first is the card's cover image. */
  photos: string[];
  /** CSS object-position for the cover photo, e.g. "bottom". */
  coverPosition?: string;
}

export const googleProfile = {
  url: "https://maps.app.goo.gl/bh6oWsYXUJ5tyeg46",
  rating: 4.7,
  reviewCount: 52,
} as const;

const dir = "/customers/google";

export const reviews: Review[] = [
  {
    name: "Avi Patil",
    avatar: `${dir}/avi-patil-avatar.png`,
    rating: 5,
    date: "September 2026",
    review: "Easy process from start to finish. Team har step pe guide karti rahi.",
    photos: [`${dir}/avi-patil-1.jpg`, `${dir}/avi-patil-2.jpg`, `${dir}/avi-patil-3.jpg`],
  },
  {
    name: "enthusiastic trader",
    avatar: `${dir}/enthusiastic-trader-avatar.png`,
    rating: 5,
    date: "September 2026",
    review:
      "Before buying my solar system I checked with many vendors about what materials they use, but none of them gave me proof, sirf bolte ki acha quality rahega karke bas... Where as naval electronics gave me such a detailed quotation that after reading it. I was damnn sure that I have to purchase it from them. Very satisfied with the purchase",
    photos: [`${dir}/enthusiastic-trader-1.jpg`],
    coverPosition: "bottom",
  },
  {
    name: "Bhikan Rokade",
    avatar: `${dir}/bhikan-rokade-avatar.png`,
    rating: 5,
    date: "September 2026",
    review: "Easy process from start to finish. Team har step pe guide karti rahi.",
    photos: [
      `${dir}/bhikan-rokade-1.jpg`,
      `${dir}/bhikan-rokade-2.jpg`,
      `${dir}/bhikan-rokade-3.jpg`,
    ],
  },
  {
    name: "Sapna Naykude",
    avatar: `${dir}/sapna-naykude-avatar.png`,
    rating: 5,
    date: "September 2026",
    review:
      "Good service, installation done. Staff is helpful and polite. Satisfied with overall service.",
    photos: [`${dir}/sapna-naykude-1.jpg`],
  },
  {
    name: "Veer sham Patil",
    avatar: `${dir}/veer-sham-patil-avatar.jpg`,
    rating: 5,
    date: "September 2026",
    review:
      "Good service, installation done on time. Staff is helpful and polite. Satisfied with overall service.",
    photos: [`${dir}/veer-sham-patil-1.jpg`],
  },
];
