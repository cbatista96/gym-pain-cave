import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CheckoutSuccessPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <section className="noise relative flex min-h-svh items-center justify-center overflow-hidden bg-coal px-4">
      <div className="relative max-w-xl text-center">
        <span
          className="font-display animate-rise mx-auto mb-8 flex h-20 w-20 items-center justify-center bg-blood text-4xl text-bone"
          aria-hidden="true"
        >
          ✓
        </span>
        <h1
          className="font-display animate-rise text-5xl leading-[0.95] tracking-tight uppercase sm:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {t("successTitle")}
        </h1>
        <p
          className="animate-rise mt-6 text-bone-dim"
          style={{ animationDelay: "240ms" }}
        >
          {t("successText")}
        </p>
        <Link
          href="/"
          className="animate-rise mt-10 inline-block bg-blood px-8 py-4 text-sm font-bold tracking-[0.25em] text-bone uppercase transition-all hover:-translate-y-1 hover:bg-blood-dark"
          style={{ animationDelay: "360ms" }}
        >
          {t("successCta")}
        </Link>
      </div>
    </section>
  );
}
