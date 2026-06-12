"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center border border-smoke text-xs font-bold tracking-widest uppercase"
      role="group"
      aria-label={t("switchLocale")}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-pressed={l === locale}
          className={`px-2.5 py-1.5 transition-colors ${
            l === locale ? "bg-blood text-bone" : "text-bone-dim hover:text-bone"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
