import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CLASSES, type ClassKey } from "@/data/site";
import Reveal from "./Reveal";

type ClassCardProps = {
  classKey: ClassKey;
  index?: number;
  detailed?: boolean;
};

export default async function ClassCard({ classKey, index = 0, detailed = false }: ClassCardProps) {
  const t = await getTranslations("classes");
  const data = CLASSES[classKey];

  return (
    <Reveal
      delay={index * 80}
      direction={index % 2 === 0 ? "left" : "right"}
      className="group relative"
    >
      <article className="relative flex h-full flex-col overflow-hidden border border-smoke bg-ash transition-colors duration-300 hover:border-blood">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={data.image}
            alt={t(`items.${classKey}.name`)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/20 to-transparent" />
          <span className="font-display absolute top-4 left-4 bg-blood px-3 py-1 text-sm tracking-wider text-bone uppercase">
            {t(`levels.${data.level}`)}
          </span>
          {/* intensity bars */}
          <div
            className="absolute right-4 bottom-4 flex gap-1"
            aria-label={`${t("intensity")}: ${data.intensity}/5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-4 w-1.5 -skew-x-12 ${i < data.intensity ? "bg-blood" : "bg-bone/25"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl tracking-wide text-bone uppercase transition-colors group-hover:text-blood">
            {t(`items.${classKey}.name`)}
          </h3>
          <p className="mt-1 text-sm font-semibold tracking-wide text-blood uppercase">
            {t(`items.${classKey}.tagline`)}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
            {t(`items.${classKey}.description`)}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-smoke pt-4 text-xs tracking-wide text-bone-dim uppercase">
            <span>
              <span className="text-blood">●</span> {t("minutes", { count: data.duration })}
            </span>
            {detailed && (
              <span>
                <span className="text-blood">●</span> {t(`items.${classKey}.schedule`)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
