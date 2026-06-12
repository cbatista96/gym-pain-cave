import { getTranslations } from "next-intl/server";

const ITEMS = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
  "item7",
  "item8",
  "item9",
  "item10",
  "item11",
  "item12"
] as const;

export default async function Marquee() {
  const t = await getTranslations("marquee");

  const strip = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((key) => (
        <span key={key} className="flex items-center">
          <span className="font-display px-6 text-2xl tracking-wider whitespace-nowrap text-bone uppercase sm:text-3xl">
            {t(key)}
          </span>
          <span className="h-3 w-3 -skew-x-12 bg-blood" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  /* Four identical strips, translating exactly -50% (two strips) per cycle:
     the end frame matches the start frame pixel-for-pixel, so the loop is
     seamless on any viewport width — no gap, no visible restart. */
  return (
    <div
      className="relative overflow-hidden border-y-4 border-blood bg-coal py-4"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {strip}
        {strip}
        {strip}
        {strip}
      </div>
    </div>
  );
}
