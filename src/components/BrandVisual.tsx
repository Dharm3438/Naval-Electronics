/** Typographic fallback mark, used until an official logo file is supplied. */
export function BrandMark({
  initials,
  accent,
  className = "",
}: {
  initials: string;
  accent: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl font-display font-extrabold tracking-tight ${className}`}
      style={{ backgroundColor: `${accent}1A`, color: accent }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/**
 * Illustration of a tilted module array in the brand's accent colour, shown
 * until a real installation photo is added to /public/brands.
 */
export function PanelVisual({
  accent,
  className = "",
}: {
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      role="img"
      aria-label="Illustration of a tilted solar module array"
    >
      <defs>
        <linearGradient id={`pv-${accent.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0B3B2C" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle cx="334" cy="46" r="26" fill={accent} opacity="0.16" />
      <circle cx="334" cy="46" r="14" fill={accent} opacity="0.55" />
      <path
        d="M44 152 L290 152 L258 62 L76 62 Z"
        fill={`url(#pv-${accent.slice(1)})`}
      />
      <g stroke="#FFFFFF" strokeWidth="1.5" opacity="0.35">
        <path d="M121 62 L105 152" />
        <path d="M167 62 L167 152" />
        <path d="M212 62 L229 152" />
        <path d="M62 107 L272 107" />
      </g>
      <path
        d="M44 152 L290 152 L258 62 L76 62 Z"
        fill="none"
        stroke="#0B3B2C"
        strokeWidth="3"
      />
      <g stroke="#94A3B8" strokeWidth="5" strokeLinecap="round">
        <path d="M60 152v18" />
        <path d="M274 152v18" />
        <path d="M84 64v106" />
      </g>
      <rect x="40" y="170" width="250" height="4" rx="2" fill="#CBD5E1" />
    </svg>
  );
}
