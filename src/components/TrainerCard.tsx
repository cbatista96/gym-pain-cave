import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { TRAINERS, type TrainerKey } from "@/data/site";
import Reveal from "./Reveal";

type TrainerCardProps = {
  trainerKey: TrainerKey;
  index?: number;
};

export default async function TrainerCard({ trainerKey, index = 0 }: TrainerCardProps) {
  const t = await getTranslations("trainers");
  const data = TRAINERS[trainerKey];

  return (
    <Reveal delay={index * 80}>
      <article className="group relative overflow-hidden border border-smoke bg-ash transition-colors duration-300 hover:border-blood">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={data.image}
            alt={t(`items.${trainerKey}.name`)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent" />
          <span className="font-display absolute right-0 bottom-0 bg-blood px-3 py-1.5 text-xs tracking-widest text-bone uppercase">
            {t("experience", { years: data.years })}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-display text-xl leading-tight tracking-wide text-bone uppercase transition-colors group-hover:text-blood">
            {t(`items.${trainerKey}.name`)}
          </h3>
          <p className="mt-1 text-xs font-bold tracking-[0.2em] text-blood uppercase">
            {t(`items.${trainerKey}.role`)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-bone-dim">
            {t(`items.${trainerKey}.bio`)}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
