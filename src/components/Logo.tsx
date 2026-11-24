/** Geometric sun-over-circuit mark used in the navbar and footer. */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Naval Electronics logo"
    >
      <circle cx="24" cy="24" r="22" fill="#0F172A" />
      <circle cx="24" cy="22" r="7.5" fill="#F59E0B" />
      <g stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round">
        <path d="M24 6.5v4" />
        <path d="M11.6 11.6l2.9 2.9" />
        <path d="M36.4 11.6l-2.9 2.9" />
        <path d="M5.5 22h4" />
        <path d="M38.5 22h4" />
      </g>
      <g stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M10 34h7.5l3-4.5 3 9 3-4.5H38" />
      </g>
      <circle cx="17.5" cy="34" r="2" fill="#10B981" />
      <circle cx="38" cy="34" r="2" fill="#10B981" />
    </svg>
  );
}
