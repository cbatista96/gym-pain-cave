import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { POST_SLUGS } from "@/data/site";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  return { title: t("title"), description: t("description") };
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POST_SLUGS.map((slug, i) => (
              <BlogCard key={slug} slug={slug} index={i % 3} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
