"use client";

import { Children, useRef, useState, type ReactNode } from "react";

/**
 * Below the `sm` breakpoint, lays its children out as a horizontal,
 * snap-scrolling row (one card in view, the next one peeking) with dot
 * indicators. From `sm` up it is a plain grid — pass the grid column classes
 * in `gridClassName`, e.g. "sm:grid-cols-2 lg:grid-cols-3".
 *
 * Each child should be a single element; it is wrapped in an <li>.
 */
export default function SwipeRow({
  children,
  gridClassName,
  label,
  className = "",
}: {
  children: ReactNode;
  gridClassName: string;
  /** Accessible name for the list, e.g. "Customer reviews". */
  label: string;
  className?: string;
}) {
  const items = Children.toArray(children);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  };

  const onScroll = () => {
    const s = step();
    if (!s || !track.current) return;
    setActive(
      Math.min(items.length - 1, Math.round(track.current.scrollLeft / s)),
    );
  };

  const goTo = (i: number) => {
    track.current?.scrollTo({ left: i * step(), behavior: "smooth" });
  };

  return (
    <div className={className}>
      <ul
        ref={track}
        onScroll={onScroll}
        aria-label={label}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 pt-4 sm:mx-0 sm:grid sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 ${gridClassName}`}
      >
        {items.map((child, i) => (
          <li
            key={i}
            className="flex w-[85%] shrink-0 snap-start sm:w-auto [&>*]:w-full"
          >
            {child}
          </li>
        ))}
      </ul>

      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to item ${i + 1} of ${items.length}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-amber" : "w-2 bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
