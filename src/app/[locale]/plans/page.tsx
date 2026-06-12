import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PROGRAM_KEYS, PROGRAMS, type ProgramKey } from "@/data/site";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.plans" });
  return { title: t("title"), description: t("description") };
}

async function ProgramCard({
  programKey,
  index
}: {
  programKey: ProgramKey;
  index: number;
}) {
  const t = await getTranslations("programs");
  const data = PROGRAMS[programKey];

  return (
    <Reveal delay={(index % 3) * 80} direction={index % 2 === 0 ? "left" : "right"}>
      <article className="group relative flex h-full flex-col overflow-hidden border border-smoke bg-ash p-7 transition-colors duration-300 hover:border-blood">
        {/* ghost index number */}
        <span
          className="font-display pointer-events-none absolute -top-3 -right-2 text-8xl leading-none text-bone/5 transition-colors group-hover:text-blood/10 select-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="font-display mb-4 inline-block w-fit bg-blood px-2.5 py-1 text-xs tracking-widest text-bone uppercase">
          {t(`levels.${data.level}`)}
        </span>

        <h3 className="font-display relative text-2xl leading-tight tracking-wide text-bone uppercase transition-colors group-hover:text-blood">
          {t(`items.${programKey}.name`)}
        </h3>

        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
          {t(`items.${programKey}.description`)}
        </p>

        <div className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-smoke pt-4 text-xs tracking-wide text-bone-dim uppercase">
          <span>
            <span className="text-blood">●</span>{" "}
            {data.weeks
              ? t("weeks", { count: data.weeks })
              : data.minutes
                ? t("minutes", { count: data.minutes })
                : t("ongoing")}
          </span>
          {data.sessionsPerWeek && (
            <span>
              <span className="text-blood">●</span>{" "}
              {t("perWeek", { count: data.sessionsPerWeek })}
            </span>
          )}
          <span
            className="ml-auto flex gap-1"
            aria-label={`${t("intensity")}: ${data.intensity}/5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-3.5 w-1.5 -skew-x-12 ${i < data.intensity ? "bg-blood" : "bg-bone/20"}`}
              />
            ))}
          </span>
        </div>

        <Link
          href="/contact"
          className="relative mt-5 inline-flex w-fit items-center gap-2 text-xs font-bold tracking-[0.2em] text-blood uppercase transition-colors hover:text-bone"
        >
          {t("cta")} <span aria-hidden="true">→</span>
        </Link>
      </article>
    </Reveal>
  );
}

export default async function PlansPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");

  const goalPlans = PROGRAM_KEYS.filter((k) => PROGRAMS[k].group === "plan");
  const specialClasses = PROGRAM_KEYS.filter((k) => PROGRAMS[k].group === "class");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <h2 className="font-display slash mb-10 text-3xl tracking-wide uppercase sm:text-4xl">
              {t("plansGroup")}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {goalPlans.map((key, i) => (
              <ProgramCard key={key} programKey={key} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ash py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <h2 className="font-display slash mb-10 text-3xl tracking-wide uppercase sm:text-4xl">
              {t("classesGroup")}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialClasses.map((key, i) => (
              <ProgramCard key={key} programKey={key} index={i + goalPlans.length} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
