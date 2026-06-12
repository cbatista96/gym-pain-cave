import Reveal from "./Reveal";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  kicker,
  title,
  titleAccent,
  subtitle,
  align = "left",
  light = false
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      direction={centered ? "up" : "left"}
      className={`mb-12 max-w-3xl sm:mb-16 ${centered ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`slash mb-4 text-xs font-bold tracking-[0.3em] uppercase ${
          light ? "text-blood-dark" : "text-blood"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`font-display text-4xl leading-[0.95] tracking-tight uppercase sm:text-5xl lg:text-6xl ${
          light ? "text-coal" : "text-bone"
        }`}
      >
        {title}{" "}
        {titleAccent && <span className="text-blood">{titleAccent}</span>}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg ${light ? "text-smoke" : "text-bone-dim"}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
