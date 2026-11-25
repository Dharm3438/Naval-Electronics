/**
 * Faceted "NE" monogram — the Naval Electronics brand mark, used in the
 * navbar and footer. Each stroke is split along a ridge into a light and a
 * dark face so the letters read as bevelled, matching the supplied logo:
 * a deep-green N interlocked with a pale-mint E.
 */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Naval Electronics logo"
    >
      {/* N — diagonal */}
      <polygon points="2,8 5.5,8 21.5,40 18,40" fill="#4CB574" />
      <polygon points="5.5,8 9,8 25,40 21.5,40" fill="#2E8B57" />
      {/* N — left stem */}
      <polygon points="2,8 5.5,11.5 5.5,36.5 2,40" fill="#4CB574" />
      <polygon points="9,8 5.5,11.5 5.5,36.5 9,40" fill="#35995F" />
      <polygon points="2,8 9,8 5.5,11.5" fill="#3FA866" />
      <polygon points="2,40 9,40 5.5,36.5" fill="#236F47" />
      {/* N — right stem */}
      <polygon points="18,8 21.5,11.5 21.5,36.5 18,40" fill="#3FA866" />
      <polygon points="25,8 21.5,11.5 21.5,36.5 25,40" fill="#2A8050" />
      <polygon points="18,8 25,8 21.5,11.5" fill="#7FD3A0" />
      <polygon points="18,40 25,40 21.5,36.5" fill="#236F47" />

      {/* E — top bar */}
      <polygon points="25,8 46,8 43,11 25,11" fill="#B2E5C5" />
      <polygon points="25,14 46,14 43,11 25,11" fill="#7CC199" />
      <polygon points="46,8 46,14 43,11" fill="#95D2AC" />
      {/* E — middle bar */}
      <polygon points="25,21 42,21 39,24 25,24" fill="#B2E5C5" />
      <polygon points="25,27 42,27 39,24 25,24" fill="#7CC199" />
      <polygon points="42,21 42,27 39,24" fill="#95D2AC" />
      {/* E — bottom bar */}
      <polygon points="25,34 46,34 43,37 25,37" fill="#B2E5C5" />
      <polygon points="25,40 46,40 43,37 25,37" fill="#74B990" />
      <polygon points="46,34 46,40 43,37" fill="#95D2AC" />
      {/* E — stem */}
      <polygon points="25,8 28,11 28,37 25,40" fill="#A7DFBC" />
      <polygon points="28,11 31,11 31,37 28,37" fill="#8ACCA4" />
    </svg>
  );
}
