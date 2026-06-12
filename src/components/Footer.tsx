import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LogoBadge from "./LogoBadge";
import NewsletterForm from "./NewsletterForm";
import SocialLinks from "./SocialLinks";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tContact = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  const navItems = [
    { key: "classes", href: "/classes" },
    { key: "plans", href: "/plans" },
    { key: "trainers", href: "/trainers" },
    { key: "membership", href: "/membership" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" }
  ] as const;

  return (
    <footer className="relative border-t-4 border-blood bg-ash">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" aria-label={tNav("home")} className="inline-block text-bone transition-colors hover:text-blood">
            <LogoBadge className="w-44" slogan={tCommon("sloganShort")} />
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-bone-dim">{t("tagline")}</p>
          <div className="mt-6">
            <SocialLinks title={t("followTitle")} />
          </div>
        </div>

        <nav aria-label={t("navTitle")}>
          <h3 className="font-display mb-5 text-lg tracking-widest text-bone uppercase">
            {t("navTitle")}
          </h3>
          <ul className="space-y-3">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-sm text-bone-dim transition-colors hover:text-blood"
                >
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display mb-5 text-lg tracking-widest text-bone uppercase">
            {t("contactTitle")}
          </h3>
          <ul className="space-y-3 text-sm text-bone-dim">
            <li>{tContact("address")}</li>
            <li>{tContact("city")}</li>
            <li>
              <a href={`tel:${tContact("phone").replace(/\s/g, "")}`} className="hover:text-blood">
                {tContact("phone")}
              </a>
            </li>
            <li>
              <a href={`mailto:${tContact("emailAddress")}`} className="hover:text-blood">
                {tContact("emailAddress")}
              </a>
            </li>
          </ul>
          <h3 className="font-display mt-7 mb-3 text-lg tracking-widest text-bone uppercase">
            {t("hoursTitle")}
          </h3>
          <ul className="space-y-1.5 text-sm text-bone-dim">
            <li>{tContact("hoursWeek")}</li>
            <li>{tContact("hoursWeekend")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display mb-5 text-lg tracking-widest text-bone uppercase">
            {t("newsletterTitle")}
          </h3>
          <p className="mb-4 text-sm text-bone-dim">{t("newsletterText")}</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-smoke">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-bone-dim sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {tCommon("brand")}. {t("rights")}
          </p>
          <div className="flex gap-6">
            <span>{t("privacy")}</span>
            <span>{t("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
