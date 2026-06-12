import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PLAN_IDS, PLANS } from "@/data/site";
import PageHero from "@/components/PageHero";
import PlanCard from "@/components/PlanCard";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.membership" });
  return { title: t("title"), description: t("description") };
}

export default async function MembershipPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  const faqs = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
    { q: t("faq4q"), a: t("faq4a") }
  ];

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 pt-4 lg:grid-cols-3">
            {PLAN_IDS.map((id, i) => (
              <Reveal key={id} delay={i * 100} className="h-full">
                <PlanCard planId={id} popular={PLANS[id].popular} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="mt-10 text-center text-xs tracking-widest text-bone-dim uppercase">
              {t("guarantee")} · {t("secure")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ash py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display slash mb-10 text-3xl tracking-wide uppercase sm:text-4xl">
              {t("faqTitle")}
            </h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 70}>
                <details className="group border border-smoke bg-coal open:border-blood">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-bold tracking-wide uppercase select-none">
                    {faq.q}
                    <span
                      className="font-display text-2xl text-blood transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-bone-dim">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
