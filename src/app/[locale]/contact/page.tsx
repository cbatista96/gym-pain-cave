import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-coal py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-3">
            <h2 className="font-display slash mb-8 text-3xl tracking-wide uppercase">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2">
            <div className="space-y-10 border border-smoke bg-ash p-8">
              <div>
                <h2 className="font-display mb-4 text-xl tracking-widest text-blood uppercase">
                  {t("infoTitle")}
                </h2>
                <ul className="space-y-2 text-sm text-bone-dim">
                  <li>{t("address")}</li>
                  <li>{t("city")}</li>
                  <li>
                    <a
                      href={`tel:${t("phone").replace(/\s/g, "")}`}
                      className="transition-colors hover:text-blood"
                    >
                      {t("phone")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${t("emailAddress")}`}
                      className="transition-colors hover:text-blood"
                    >
                      {t("emailAddress")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display mb-4 text-xl tracking-widest text-blood uppercase">
                  {t("hoursTitle")}
                </h2>
                <ul className="space-y-2 text-sm text-bone-dim">
                  <li>{t("hoursWeek")}</li>
                  <li>{t("hoursWeekend")}</li>
                </ul>
                <p className="mt-4 border-l-4 border-blood pl-3 text-xs tracking-wide text-bone uppercase">
                  {t("hoursNote")}
                </p>
              </div>

              {/* Map embed */}
              <div className="relative aspect-video overflow-hidden border border-smoke">
                <iframe
                  title={t("infoTitle")}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-3.72%2C40.40%2C-3.66%2C40.44&layer=mapnik"
                  className="h-full w-full grayscale invert"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
