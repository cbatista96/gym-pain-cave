import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CLASS_KEYS } from "@/data/site";
import PageHero from "@/components/PageHero";
import ClassCard from "@/components/ClassCard";
import CtaBanner from "@/components/CtaBanner";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.classes" });
  return { title: t("title"), description: t("description") };
}

export default async function ClassesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("classes");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("pageTitle")} subtitle={t("pageSubtitle")} />
      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLASS_KEYS.map((key, i) => (
              <ClassCard key={key} classKey={key} index={i % 3} detailed />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
