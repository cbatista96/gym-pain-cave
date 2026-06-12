import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { POSTS, type PostSlug } from "@/data/site";
import Reveal from "./Reveal";

type BlogCardProps = {
  slug: PostSlug;
  index?: number;
};

export default async function BlogCard({ slug, index = 0 }: BlogCardProps) {
  const t = await getTranslations("blog");
  const format = await getFormatter();
  const post = POSTS[slug];

  return (
    <Reveal delay={index * 80} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden border border-smoke bg-ash transition-colors duration-300 hover:border-blood">
        <Link href={`/blog/${slug}`} className="relative block aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={t(`posts.${slug}.title`)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <span className="font-display absolute top-4 left-4 bg-blood px-3 py-1 text-xs tracking-widest text-bone uppercase">
            {t(`posts.${slug}.category`)}
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs tracking-widest text-bone-dim uppercase">
            {format.dateTime(new Date(post.date), { dateStyle: "long", timeZone: "UTC" })} ·{" "}
            {t("minRead", { count: post.readMins })}
          </p>
          <h3 className="font-display mt-3 text-xl leading-snug tracking-wide text-bone uppercase transition-colors group-hover:text-blood">
            <Link href={`/blog/${slug}`}>{t(`posts.${slug}.title`)}</Link>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
            {t(`posts.${slug}.excerpt`)}
          </p>
          <Link
            href={`/blog/${slug}`}
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blood uppercase transition-colors hover:text-bone"
          >
            {t("readMore")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
