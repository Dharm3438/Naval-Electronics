import { Heart, MapPin, Quote, Star, Sun, UserRound } from "lucide-react";
import { customers } from "@/lib/customers";
import { site } from "@/lib/site";

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
            Homes, societies and industrial units across {site.city} running on
            systems we designed, installed and commissioned.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((c) => (
            <li
              key={`${c.name}-${c.locality}`}
              className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              {c.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.photo}
                  alt={c.photoAlt ?? `${c.system} installed at ${c.locality}`}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover"
                />
              ) : (
                <PhotoPlaceholder label={c.system} />
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-base font-extrabold leading-snug text-ink">
                      {c.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-ink/55">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-amber" aria-hidden />
                      {c.locality}
                    </div>
                  </div>
                  <div
                    className="flex shrink-0 gap-0.5"
                    aria-label={`Rated ${c.rating} out of 5`}
                  >
                    {Array.from({ length: c.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber text-amber" aria-hidden />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                  <Quote className="mb-1.5 h-4 w-4 text-ink/20" aria-hidden />
                  {c.review}
                </blockquote>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
                  <span className="rounded-lg bg-cream px-2.5 py-1.5 text-[11px] font-bold text-ink/65">
                    {c.system}
                  </span>
                  <span className="rounded-lg bg-emerald/10 px-2.5 py-1.5 text-[11px] font-bold text-emerald-deep">
                    Saving {c.savings}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

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
          <a
            href="#quote"
            className="inline-flex items-center justify-center rounded-xl bg-amber px-6 py-3.5 text-sm font-bold text-ink shadow-lg shadow-amber/25 transition-all hover:bg-amber-deep"
          >
            Book My Free Site Survey
          </a>
        </div>
      </div>
    </section>
  );
}

/** Illustrated stand-in shown until a real customer photo is added. */
function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-4/3 w-full items-center justify-center bg-ink/5">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(18rem 12rem at 75% 15%, rgba(245,158,11,0.22), transparent 65%), radial-gradient(16rem 12rem at 10% 85%, rgba(16,185,129,0.18), transparent 65%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <Sun className="h-9 w-9 text-amber" aria-hidden />
        <span className="text-xs font-bold uppercase tracking-wider text-ink/45">
          {label}
        </span>
      </div>
    </div>
  );
}
