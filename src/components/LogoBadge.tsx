type LogoBadgeProps = {
  className?: string;
  slogan?: string;
};

/* Full badge version of the Pain Cave logo (vector recreation of the brand
   artwork): ring with a flexed arm curling a dumbbell over the stacked
   PAIN / CAVE wordmark and the slogan plate. Renders in currentColor so it
   adapts to any background; the slogan plate is inverted. */
export default function LogoBadge({ className, slogan }: LogoBadgeProps) {
  return (
    <svg
      viewBox="0 0 360 470"
      className={className}
      role="img"
      aria-label={`Pain Cave — ${slogan ?? "be STRONGER than your EXCUSES"}`}
    >
      {/* badge ring */}
      <circle cx="180" cy="180" r="132" fill="none" stroke="currentColor" strokeWidth="13" />

      {/* dumbbell, tilted like the original artwork; drawn first so the
          fist overlaps the bar */}
      <g transform="rotate(-25 228 88)" fill="currentColor">
        <rect x="128" y="81" width="200" height="14" rx="5" />
        <rect x="150" y="32" width="26" height="112" rx="10" />
        <rect x="181" y="46" width="17" height="84" rx="8" />
        <rect x="280" y="32" width="26" height="112" rx="10" />
        <rect x="258" y="46" width="17" height="84" rx="8" />
      </g>

      {/* flexed arm pictogram: shoulder + upper arm + bicep bump,
          forearm rising to the fist on the bar */}
      <g fill="currentColor">
        {/* upper arm base */}
        <path d="M88 246 Q82 202 128 192 L238 192 L246 244 Q168 262 102 252 Z" />
        {/* shoulder */}
        <circle cx="114" cy="216" r="36" />
        {/* bicep bump */}
        <circle cx="172" cy="196" r="40" />
        {/* forearm */}
        <rect x="206" y="98" width="42" height="140" rx="19" transform="rotate(9 227 168)" />
        {/* fist gripping the bar */}
        <rect x="198" y="78" width="54" height="44" rx="13" />
      </g>
      {/* elbow crease: black wedge separating bicep from forearm */}
      <path
        fill="var(--color-coal, #0a0a0a)"
        d="M202 134 Q212 168 214 198 L196 198 Q192 158 196 136 Z"
      />

      {/* wordmark */}
      <text
        x="180"
        y="386"
        textAnchor="middle"
        fontFamily="var(--font-display), Impact, sans-serif"
        fontSize="116"
        letterSpacing="2"
        fill="currentColor"
      >
        PAIN
      </text>
      <text
        x="180"
        y="430"
        textAnchor="middle"
        fontFamily="var(--font-display), Impact, sans-serif"
        fontSize="48"
        letterSpacing="10"
        fill="currentColor"
      >
        CAVE
      </text>

      {/* slogan plate */}
      <rect x="22" y="442" width="316" height="26" rx="5" fill="currentColor" />
      <text
        x="180"
        y="460"
        textAnchor="middle"
        fontFamily="var(--font-body), system-ui, sans-serif"
        fontSize="14.5"
        fontWeight="800"
        fill="var(--color-coal, #0a0a0a)"
      >
        {slogan ?? "be STRONGER than your EXCUSES"}
      </text>
    </svg>
  );
}
