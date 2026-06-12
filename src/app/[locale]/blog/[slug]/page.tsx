import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { POSTS, POST_SLUGS, type PostSlug } from "@/data/site";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    POST_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!POST_SLUGS.includes(slug as PostSlug)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t(`posts.${slug}.title`)} — Pain Cave`,
    description: t(`posts.${slug}.excerpt`)
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!POST_SLUGS.includes(slug as PostSlug)) {
    notFound();
  }
  const postSlug = slug as PostSlug;
  const post = POSTS[postSlug];

  const t = await getTranslations("blog");
  const tTrainers = await getTranslations("trainers");
  const format = await getFormatter();

  const paragraphs = t.raw(`posts.${postSlug}.content`) as string[];
  const related = POST_SLUGS.filter((s) => s !== postSlug).slice(0, 3);

  return (
    <>
      <article>
        {/* Post hero */}
        <header className="noise relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <Spotlight className="absolute inset-0">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="spotlight-color object-cover opacity-25 grayscale transition-all duration-700"
              aria-hidden="true"
            />
          </Spotlight>
          <div className="absolute inset-0 bg-gradient-to-b from-coal/70 via-coal/50 to-coal" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <Link
              href="/blog"
              className="animate-rise mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-bone-dim uppercase transition-colors hover:text-blood"
            >
              <span aria-hidden="true">←</span> {t("backToBlog")}
            </Link>
            <p
              className="animate-rise font-display inline-block w-fit bg-blood px-3 py-1 text-sm tracking-widest text-bone uppercase ml-4"
              style={{ animationDelay: "80ms" }}
            >
              {t(`posts.${postSlug}.category`)}
            </p>
            <h1
              className="font-display animate-rise mt-6 text-4xl leading-[1.02] tracking-tight uppercase sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "160ms" }}
            >
              {t(`posts.${postSlug}.title`)}
            </h1>
            <p
              className="animate-rise mt-6 text-xs tracking-[0.2em] text-bone-dim uppercase"
              style={{ animationDelay: "240ms" }}
            >
              {t("by", { name: tTrainers(`items.${post.authorKey}.name`) })} ·{" "}
              {format.dateTime(new Date(post.date), { dateStyle: "long", timeZone: "UTC" })} ·{" "}
              {t("minRead", { count: post.readMins })}
            </p>
          </div>
          <div className="hazard absolute bottom-0 left-0 h-2 w-full" aria-hidden="true" />
        </header>

        {/* Body */}
        <div className="bg-coal py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-7 px-4 sm:px-6">
            {paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={Math.min(i * 40, 160)}>
                <p
                  className={
                    i === 0
                      ? "border-l-4 border-blood pl-5 text-lg leading-relaxed text-bone"
                      : "leading-relaxed text-bone-dim"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-smoke bg-ash py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display slash mb-10 text-3xl tracking-wide uppercase">
            {t("relatedTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <BlogCard key={s} slug={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
