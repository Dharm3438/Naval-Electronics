import { ExternalLink, Heart, Quote, Star, UserRound } from "lucide-react";
import { googleProfile, reviews } from "@/lib/customers";
import ConsultButton from "./ConsultButton";
import SwipeRow from "./SwipeRow";

export default function Customers() {
  return (
    <section id="customers" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-emerald-deep">
            <Heart className="h-4 w-4" aria-hidden />
            Satisfied Customers
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Roofs we have powered, in their words
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            Real reviews and installation photos from our customers, as posted
            on Google.
          </p>
        </div>

        <a
          href={googleProfile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
        >
          <GoogleG className="h-6 w-6" />
          <span className="font-display text-2xl font-extrabold text-ink">
            {googleProfile.rating.toFixed(1)}
          </span>
          <Stars rating={Math.round(googleProfile.rating)} />
          <span className="text-sm font-semibold text-ink/60">
            {googleProfile.reviewCount} Google reviews
          </span>
          <ExternalLink className="h-4 w-4 text-ink/40" aria-hidden />
        </a>

        <SwipeRow
          label="Customer reviews"
          gridClassName="sm:grid-cols-2 lg:grid-cols-3"
          className="mt-8 sm:mt-10"
        >
          {reviews.map((r) => (
            <article
              key={r.name}
              className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <a href={r.photos[0]} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.photos[0]}
                  alt={`Solar installation photo shared by ${r.name}`}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover"
                  style={{ objectPosition: r.coverPosition ?? "center" }}
                />
              </a>
              {r.photos.length > 1 && (
                <div className="grid grid-cols-3 gap-1 px-1 pt-1">
                  {r.photos.slice(1, 4).map((src, i) => (
                    <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Photo ${i + 2} shared by ${r.name}`}
                        loading="lazy"
                        className="aspect-4/3 w-full rounded-md object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  {r.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.avatar}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald text-lg font-bold text-white">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-base font-extrabold capitalize leading-snug text-ink">
                      {r.name}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2">
                      <Stars rating={r.rating} />
                      <span className="text-xs font-semibold text-ink/50">{r.date}</span>
                    </div>
                  </div>
                  <GoogleG className="h-5 w-5 shrink-0" />
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                  <Quote className="mb-1.5 h-4 w-4 text-ink/20" aria-hidden />
                  {r.review}
                </blockquote>
              </div>
            </article>
          ))}
        </SwipeRow>

        <div className="mt-8 text-center">
          <a
            href={googleProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-amber hover:text-amber-deep"
          >
            Read all {googleProfile.reviewCount} reviews on Google
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-ink/10 bg-white px-6 py-8 text-center">
          <UserRound className="h-8 w-8 text-amber" aria-hidden />
          <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
            Your roof could be the next one here
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-ink/65">
            Book a free site survey and we will show you exactly what your roof
            can generate — no obligation, and no payment until you approve the
            design.
          </p>
          <ConsultButton
            className="inline-flex items-center justify-center rounded-xl bg-amber px-6 py-3.5 text-sm font-bold text-ink shadow-lg shadow-amber/25 transition-all hover:bg-amber-deep"
          >
            Book My Free Site Survey
          </ConsultButton>
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber text-amber" : "text-ink/20"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

/** Google "G" mark, labelling a review as sourced from Google. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Google review">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
