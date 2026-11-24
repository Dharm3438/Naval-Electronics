/**
 * Custom architectural rooftop-solar illustration: a modern flat-roof home
 * with two tilted panel arrays, inverter and net meter. Pure SVG so it
 * stays crisp at every breakpoint with no image payload.
 */
export function RooftopIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      role="img"
      aria-label="Illustration of a modern house with a rooftop solar panel array, inverter and net meter"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="55%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E7EBF0" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      <rect width="640" height="520" rx="28" fill="url(#sky)" />

      {/* Sun */}
      <g>
        <circle cx="505" cy="108" r="54" fill="#F59E0B" opacity="0.12" />
        <circle cx="505" cy="108" r="38" fill="#F59E0B" opacity="0.18" />
        <circle cx="505" cy="108" r="26" fill="url(#sunGrad)" />
        <g
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.75"
          style={{ transformOrigin: "505px 108px" }}
          className="animate-sun-spin"
        >
          <path d="M505 62v-13" />
          <path d="M505 167v13" />
          <path d="M459 108h-13" />
          <path d="M551 108h13" />
          <path d="M472 75l-9-9" />
          <path d="M538 141l9 9" />
          <path d="M538 75l9-9" />
          <path d="M472 141l-9 9" />
        </g>
      </g>

      {/* Distant skyline */}
      <g fill="#CBD5E1" opacity="0.55">
        <rect x="18" y="212" width="52" height="128" rx="4" />
        <rect x="78" y="252" width="38" height="88" rx="4" />
        <rect x="560" y="236" width="62" height="104" rx="4" />
      </g>

      {/* Ground */}
      <rect x="0" y="430" width="640" height="90" fill="#CBD5E1" opacity="0.4" />
      <rect x="0" y="430" width="640" height="4" fill="#94A3B8" opacity="0.5" />

      {/* House body */}
      <g>
        <rect x="112" y="286" width="340" height="146" fill="url(#wall)" />
        <rect x="112" y="286" width="340" height="146" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Roof slab */}
        <rect x="96" y="272" width="372" height="18" rx="4" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Windows */}
        <rect x="142" y="316" width="78" height="56" rx="3" fill="#0F172A" opacity="0.82" />
        <rect x="142" y="316" width="78" height="56" rx="3" fill="url(#glare)" />
        <rect x="248" y="316" width="78" height="56" rx="3" fill="#0F172A" opacity="0.82" />
        <rect x="248" y="316" width="78" height="56" rx="3" fill="url(#glare)" />
        {/* Door */}
        <rect x="360" y="332" width="56" height="100" rx="3" fill="#0F172A" opacity="0.9" />
        <circle cx="406" cy="384" r="3" fill="#F59E0B" />
        {/* Balcony rail */}
        <g stroke="#94A3B8" strokeWidth="2">
          <path d="M136 392h198" />
          <path d="M136 392v22M180 392v22M224 392v22M268 392v22M312 392v22M334 392v22" />
        </g>
      </g>

      {/* Panel array — left bank */}
      <g>
        <path d="M118 262 L246 262 L232 216 L132 216 Z" fill="url(#panel)" />
        <path d="M118 262 L246 262 L232 216 L132 216 Z" fill="url(#glare)" />
        <g stroke="#60A5FA" strokeWidth="1" opacity="0.45">
          <path d="M151 216 L141 262" />
          <path d="M182 216 L176 262" />
          <path d="M213 216 L211 262" />
          <path d="M127 239 L239 239" />
        </g>
        <path d="M118 262 L246 262 L232 216 L132 216 Z" fill="none" stroke="#0F172A" strokeWidth="2.5" />
        {/* Mounting legs */}
        <g stroke="#64748B" strokeWidth="4" strokeLinecap="round">
          <path d="M126 262v12" />
          <path d="M238 262v12" />
          <path d="M136 218v54" />
        </g>
      </g>

      {/* Panel array — right bank */}
      <g>
        <path d="M274 262 L440 262 L422 206 L296 206 Z" fill="url(#panel)" />
        <path d="M274 262 L440 262 L422 206 L296 206 Z" fill="url(#glare)" />
        <g stroke="#60A5FA" strokeWidth="1" opacity="0.45">
          <path d="M327 206 L314 262" />
          <path d="M359 206 L353 262" />
          <path d="M391 206 L392 262" />
          <path d="M285 234 L431 234" />
        </g>
        <path d="M274 262 L440 262 L422 206 L296 206 Z" fill="none" stroke="#0F172A" strokeWidth="2.5" />
        <g stroke="#64748B" strokeWidth="4" strokeLinecap="round">
          <path d="M282 262v12" />
          <path d="M432 262v12" />
          <path d="M300 208v64" />
        </g>
      </g>

      {/* Inverter + net meter on the wall */}
      <g>
        <rect x="470" y="318" width="54" height="72" rx="8" fill="#0F172A" />
        <rect x="480" y="330" width="34" height="20" rx="3" fill="#10B981" opacity="0.9" />
        <g fill="#64748B">
          <rect x="480" y="358" width="34" height="4" rx="2" />
          <rect x="480" y="368" width="22" height="4" rx="2" />
        </g>
        <text
          x="497"
          y="406"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="13"
          fontWeight="700"
          fontFamily="var(--font-display, sans-serif)"
        >
          Inverter
        </text>
        <rect x="548" y="332" width="42" height="44" rx="8" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
        <circle cx="569" cy="350" r="9" fill="none" stroke="#10B981" strokeWidth="2.5" />
        <path d="M569 345v6l4 3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="557" y="364" width="24" height="4" rx="2" fill="#94A3B8" />
        <text
          x="569"
          y="394"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="13"
          fontWeight="700"
          fontFamily="var(--font-display, sans-serif)"
        >
          Net Meter
        </text>
      </g>

      {/* DC/AC run from array to inverter */}
      <g stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M440 258 L458 258 L458 300 L497 300 L497 318" />
        <path d="M524 348 L548 348" />
      </g>
      <circle cx="458" cy="258" r="4" fill="#10B981" />

      {/* Earthing pit */}
      <g>
        <path d="M497 390 L497 430" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
          <path d="M483 434h28" />
          <path d="M488 441h18" />
          <path d="M493 448h8" />
        </g>
      </g>
    </svg>
  );
}
