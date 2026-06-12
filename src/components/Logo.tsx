type LogoProps = {
  className?: string;
};

/* Compact mark inspired by the official Pain Cave badge:
   dumbbell over the wordmark. Inherits currentColor; the accent bar is brand red. */
export default function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
        {/* dumbbell at 45° */}
        <g transform="rotate(-35 24 24)">
          <rect x="10" y="22" width="28" height="4" rx="1" fill="currentColor" />
          <rect x="11" y="15" width="5" height="18" rx="1.5" fill="currentColor" />
          <rect x="17" y="17.5" width="4" height="13" rx="1.5" fill="currentColor" />
          <rect x="32" y="15" width="5" height="18" rx="1.5" fill="currentColor" />
          <rect x="27" y="17.5" width="4" height="13" rx="1.5" fill="currentColor" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-[0.08em] uppercase">
          Pain<span className="text-blood">Cave</span>
        </span>
        <span className="mt-0.5 h-[3px] w-full bg-blood" aria-hidden="true" />
      </span>
    </span>
  );
}
