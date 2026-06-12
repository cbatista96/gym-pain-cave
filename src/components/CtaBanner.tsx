import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CTA_IMAGE } from "@/data/site";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

export default async function CtaBanner() {
  const t = await getTranslations("cta");

  return (
    <section className="noise relative overflow-hidden py-24 sm:py-32">
      <Spotlight className="absolute inset-0">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="spotlight-color object-cover opacity-30 grayscale transition-all duration-700"
          aria-hidden="true"
        />
      </Spotlight>
      <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/70 to-coal" />
      <div className="hazard absolute top-0 left-0 h-2.5 w-full" aria-hidden="true" />
      <div className="hazard absolute bottom-0 left-0 h-2.5 w-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight uppercase sm:text-7xl">
            {t("title1")} <span className="text-blood">{t("title2")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-bone-dim sm:text-lg">
            {t("subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block bg-blood px-10 py-5 text-sm font-bold tracking-[0.25em] text-bone uppercase transition-all hover:-translate-y-1 hover:bg-blood-dark hover:shadow-[0_10px_40px_-10px_rgba(225,6,0,0.7)]"
          >
            {t("button")}
          </Link>
          <p className="mt-5 text-xs tracking-widest text-bone-dim uppercase">{t("note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
