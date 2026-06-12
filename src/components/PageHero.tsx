type PageHeroProps = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ kicker, title, subtitle }: PageHeroProps) {
  return (
    <section className="noise relative overflow-hidden bg-ash pt-36 pb-16 sm:pt-44 sm:pb-20">
      <span
        className="font-display text-stroke pointer-events-none absolute -bottom-[2vw] left-0 text-[16vw] leading-none whitespace-nowrap uppercase opacity-10 select-none"
        aria-hidden="true"
      >
        {title}
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="slash animate-rise mb-4 text-xs font-bold tracking-[0.3em] text-blood uppercase">
          {kicker}
        </p>
        <h1
          className="font-display animate-rise text-5xl leading-[0.95] tracking-tight uppercase sm:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-rise mt-5 max-w-2xl text-base text-bone-dim sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div className="hazard absolute bottom-0 left-0 h-2 w-full" aria-hidden="true" />
    </section>
  );
}
