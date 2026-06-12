import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TRAINER_KEYS } from "@/data/site";
import PageHero from "@/components/PageHero";
import TrainerCard from "@/components/TrainerCard";
import CtaBanner from "@/components/CtaBanner";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.trainers" });
  return { title: t("title"), description: t("description") };
}

export default async function TrainersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trainers");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("pageTitle")} subtitle={t("pageSubtitle")} />
      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRAINER_KEYS.map((key, i) => (
              <TrainerCard key={key} trainerKey={key} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
