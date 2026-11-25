"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Factory,
  HelpCircle,
  Images,
  Layers,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";
import { brands, type Brand, type BrandPhoto } from "@/lib/brands";
import { BrandMark, PanelVisual } from "./BrandVisual";
import ConsultButton from "./ConsultButton";

export default function Brands() {
  const [active, setActive] = useState<Brand | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const open = (brand: Brand, el: HTMLButtonElement) => {
    opener.current = el;
    setActive(brand);
  };

  // Returning focus to the card that opened the dialog keeps keyboard users
  // in place. React Compiler handles the memoization here.
  const close = () => {
    setActive(null);
    opener.current?.focus();
  };

  return (
    <section id="brands" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink/70">
            <Factory className="h-4 w-4" aria-hidden />
            Brands We Supply
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            Tier-1 Indian manufacturers, matched to your roof
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            We are not tied to a single manufacturer. After the site survey we
            recommend the brand that fits your roof, budget and subsidy
            eligibility — then stand behind the installation either way. Tap any
            brand for the details.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {brands.map((brand) => (
            <li key={brand.slug}>
              <button
                type="button"
                onClick={(e) => open(brand, e.currentTarget)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border sm:rounded-3xl border-ink/10 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ink/10 bg-white">
                  {brand.photos?.length ? (
                    // Brand images are pre-cropped to 4:3, so cover never trims them.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.photos[0].src}
                      alt={brand.photos[0].alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PanelVisual accent={brand.accent} className="h-full w-auto" />
                    </div>
                  )}
                  {brand.photos && brand.photos.length > 1 && (
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-ink/75 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm sm:bottom-3 sm:right-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
                      <Images className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                      {brand.photos.length}
                      <span className="hidden sm:inline"> photos</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-3.5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="hidden shrink-0 sm:block">
                      {brand.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="h-12 w-12 rounded-2xl object-contain"
                        />
                      ) : (
                        <BrandMark
                          initials={brand.initials}
                          accent={brand.accent}
                          className="h-12 w-12 text-sm"
                        />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-[15px] font-extrabold leading-tight text-ink sm:text-lg">
                        {brand.name}
                      </div>
                      <div className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-wider text-ink/45 sm:mt-0.5 sm:text-[11px]">
                        {brand.category}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 hidden flex-1 text-sm leading-relaxed text-ink/65 sm:block">
                    {brand.tagline}
                  </p>

                  <div className="mt-5 hidden items-center gap-1.5 rounded-lg bg-emerald/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-deep sm:flex">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {brand.warranty.split("·")[0].trim()}
                  </div>

                  <span className="mt-5 hidden items-center gap-1.5 border-t border-ink/10 pt-5 text-sm font-bold text-amber-deep sm:inline-flex">
                    View details
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </button>
            </li>
          ))}
          {/* Phones only: fills the empty slot left by an odd brand count. */}
          {brands.length % 2 === 1 && (
            <li className="sm:hidden">
              <ConsultButton className="flex h-full w-full flex-col items-start justify-between gap-3 rounded-2xl bg-ink p-4 text-left text-white">
                <HelpCircle className="h-7 w-7 text-amber" aria-hidden />
                <span>
                  <span className="block font-display text-[15px] font-extrabold leading-tight">
                    Not sure which brand?
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-white/65">
                    We&apos;ll recommend one after a free site survey.
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber">
                  Ask us
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </ConsultButton>
            </li>
          )}
        </ul>

        <p className="mt-8 text-center text-sm text-ink/55">
          Every module we quote for a subsidised system is ALMM-listed and
          DCR-compliant — both are mandatory to claim PM Surya Ghar assistance.
        </p>
      </div>

      {active && <BrandDialog brand={active} onClose={close} />}
    </section>
  );
}

function BrandDialog({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`brand-dialog-${brand.slug}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
      >
        <div className="relative">
          {brand.photos?.length ? (
            <Gallery photos={brand.photos} />
          ) : (
            <div className="flex h-44 w-full items-center justify-center rounded-t-3xl bg-[#F1F5F9] sm:h-52">
              <PanelVisual accent={brand.accent} className="h-full w-auto" />
            </div>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-colors hover:bg-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-14 w-14 rounded-2xl object-contain"
              />
            ) : (
              <BrandMark
                initials={brand.initials}
                accent={brand.accent}
                className="h-14 w-14 text-base"
              />
            )}
            <div>
              <h3
                id={`brand-dialog-${brand.slug}`}
                className="font-display text-2xl font-extrabold text-ink"
              >
                {brand.name}
              </h3>
              <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-ink/45">
                {brand.category}
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink/70 sm:text-[15px]">
            {brand.about}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/50">
                <Layers className="h-3.5 w-3.5" aria-hidden />
                What we supply
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {brand.products.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink/70">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-emerald/25 bg-emerald/10 p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-deep">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Warranty
                </div>
                <p className="mt-2 text-sm font-bold leading-snug text-emerald-deep">
                  {brand.warranty}
                </p>
              </div>
              <div className="flex-1 rounded-2xl border border-ink/10 bg-white p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  <Target className="h-3.5 w-3.5" aria-hidden />
                  Best for
                </div>
                <p className="mt-2 text-sm leading-snug text-ink/70">
                  {brand.bestFor}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ConsultButton
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-bold text-ink shadow-lg shadow-amber/25 transition-all hover:bg-amber-deep"
            >
              Get a quote with {brand.name}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ConsultButton>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-ink/15 px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink/35"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Shows the whole 4:3 image, centred on white, inside a wider frame. */
function PhotoFrame({ photo }: { photo: BrandPhoto }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      alt={photo.alt}
      className="absolute inset-0 h-full w-full object-contain"
    />
  );
}

function Gallery({ photos }: { photos: BrandPhoto[] }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const touchX = useRef<number | null>(null);

  return (
    <div className="overflow-hidden rounded-t-3xl bg-white">
      <div
        className="relative aspect-[4/3] max-h-[22rem] w-full overflow-hidden bg-white sm:aspect-[16/10]"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <PhotoFrame key={photos[index].src} photo={photos[index]} />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-colors hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-bold text-white">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="flex gap-2 border-b border-ink/10 bg-cream px-6 pt-4 sm:px-8">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}: ${p.alt}`}
              aria-current={i === index}
              className={`relative mb-4 h-14 w-[4.5rem] overflow-hidden rounded-lg border-2 bg-white transition-all ${
                i === index
                  ? "border-amber shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
