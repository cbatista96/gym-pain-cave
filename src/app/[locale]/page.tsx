import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ABOUT_IMAGE,
  CLASS_KEYS,
  HERO_IMAGE,
  PLAN_IDS,
  PLANS,
  TRAINER_KEYS
} from "@/data/site";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import ClassCard from "@/components/ClassCard";
import TrainerCard from "@/components/TrainerCard";
import PlanCard from "@/components/PlanCard";
import StatCounter from "@/components/StatCounter";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hero");
  const tStats = await getTranslations("stats");
  const tAbout = await getTranslations("about");
  const tClasses = await getTranslations("classes");
  const tTrainers = await getTranslations("trainers");
  const tPricing = await getTranslations("pricing");
  const tTestimonials = await getTranslations("testimonials");
  const tCommon = await getTranslations("common");

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="noise relative flex min-h-svh items-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/80 via-coal/40 to-coal" />
        {/* giant ghost text */}
        <span
          className="font-display text-stroke-red pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26vw] leading-none whitespace-nowrap uppercase opacity-15 select-none"
          aria-hidden="true"
        >
          {tCommon("brand")}
        </span>

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <p className="animate-rise mb-6 inline-block border border-blood px-4 py-2 text-xs font-bold tracking-[0.35em] text-bone uppercase">
            {t("kicker")} · {t("since")}
          </p>
          <h1 className="font-display text-[17vw] leading-[0.88] tracking-tight uppercase sm:text-8xl lg:text-9xl">
            <span className="animate-rise block" style={{ animationDelay: "100ms" }}>
              {t("title1")}
            </span>
            <span
              className="animate-rise text-stroke block"
              style={{ animationDelay: "220ms" }}
            >
              {t("title2")}
            </span>
            <span
              className="animate-rise block text-blood"
              style={{ animationDelay: "340ms" }}
            >
              {t("title3")}
            </span>
          </h1>
          <p
            className="animate-rise mt-7 max-w-xl text-base text-bone-dim sm:text-lg"
            style={{ animationDelay: "460ms" }}
          >
            {t("subtitle")}
          </p>
          <div
            className="animate-rise mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "580ms" }}
          >
            <Link
              href="/contact"
              className="bg-blood px-8 py-4 text-center text-sm font-bold tracking-[0.25em] text-bone uppercase transition-all hover:-translate-y-1 hover:bg-blood-dark hover:shadow-[0_10px_40px_-10px_rgba(225,6,0,0.7)]"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/membership"
              className="border-2 border-bone px-8 py-4 text-center text-sm font-bold tracking-[0.25em] text-bone uppercase transition-all hover:border-blood hover:text-blood"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone-dim sm:flex"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">{t("scroll")}</span>
          <span className="block h-10 w-px animate-pulse bg-blood" />
        </div>
      </section>

      <Marquee />

      {/* ============ STATS ============ */}
      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">{tStats("title")}</h2>
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            <StatCounter value={1200} suffix="+" label={tStats("members")} />
            <StatCounter value={14} label={tStats("trainers")} />
            <StatCounter value={60} suffix="+" label={tStats("classes")} />
            <StatCounter value={2500} label={tStats("sqm")} />
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="clip-up relative bg-bone py-24 text-coal sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              kicker={tAbout("kicker")}
              title={tAbout("title")}
              titleAccent={tAbout("titleAccent")}
              light
            />
            <Reveal delay={100}>
              <p className="-mt-6 mb-10 max-w-xl leading-relaxed text-smoke">
                {tAbout("description")}
              </p>
            </Reveal>
            <div className="grid gap-7 sm:grid-cols-2">
              {([1, 2, 3, 4] as const).map((n, i) => (
                <Reveal key={n} delay={i * 90}>
                  <div className="border-l-4 border-blood pl-4">
                    <h3 className="font-display text-lg tracking-wide text-coal uppercase">
                      {tAbout(`feature${n}Title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-smoke">
                      {tAbout(`feature${n}Text`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={ABOUT_IMAGE}
                alt={tAbout("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 ring-8 ring-coal ring-inset" />
            </div>
            <span
              className="font-display absolute -bottom-6 -left-2 bg-blood px-6 py-3 text-2xl tracking-wider text-bone uppercase sm:-left-6"
            >
              {tCommon("sloganShort")}
            </span>
          </Reveal>
        </div>
      </section>

      {/* ============ CLASSES PREVIEW ============ */}
      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker={tClasses("kicker")}
              title={tClasses("title")}
              subtitle={tClasses("subtitle")}
            />
            <Reveal className="mb-12 hidden sm:mb-16 lg:block">
              <Link
                href="/classes"
                className="border-2 border-bone px-6 py-3 text-xs font-bold tracking-[0.25em] text-bone uppercase transition-colors hover:border-blood hover:text-blood"
              >
                {tCommon("viewAll")}
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLASS_KEYS.slice(0, 3).map((key, i) => (
              <ClassCard key={key} classKey={key} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center lg:hidden">
            <Link
              href="/classes"
              className="inline-block border-2 border-bone px-6 py-3 text-xs font-bold tracking-[0.25em] text-bone uppercase transition-colors hover:border-blood hover:text-blood"
            >
              {tCommon("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TRAINERS PREVIEW ============ */}
      <section className="bg-ash py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={tTrainers("kicker")}
            title={tTrainers("title")}
            subtitle={tTrainers("subtitle")}
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRAINER_KEYS.map((key, i) => (
              <TrainerCard key={key} trainerKey={key} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={tPricing("kicker")}
            title={tPricing("title")}
            subtitle={tPricing("subtitle")}
            align="center"
          />
          <div className="grid gap-8 pt-4 lg:grid-cols-3">
            {PLAN_IDS.map((id, i) => (
              <Reveal key={id} delay={i * 100} className="h-full">
                <PlanCard planId={id} popular={PLANS[id].popular} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="mt-10 text-center text-xs tracking-widest text-bone-dim uppercase">
              {tPricing("guarantee")} · {tPricing("secure")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="clip-down relative bg-bone py-24 text-coal sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={tTestimonials("kicker")}
            title={tTestimonials("title")}
            align="center"
            light
          />
          <div className="grid gap-8 md:grid-cols-3">
            {(["t1", "t2", "t3"] as const).map((key, i) => (
              <Reveal key={key} delay={i * 100}>
                <figure className="relative h-full border-2 border-coal bg-bone p-8 shadow-[8px_8px_0_var(--color-blood)]">
                  <span className="font-display absolute -top-6 left-6 text-7xl text-blood" aria-hidden="true">
                    “
                  </span>
                  <blockquote className="pt-4 text-sm leading-relaxed text-smoke italic">
                    {tTestimonials(`items.${key}.quote`)}
                  </blockquote>
                  <figcaption className="mt-6 border-t-2 border-coal pt-4">
                    <p className="font-display tracking-wide uppercase">
                      {tTestimonials(`items.${key}.name`)}
                    </p>
                    <p className="text-xs tracking-widest text-blood uppercase">
                      {tTestimonials(`items.${key}.detail`)}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
