"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("footer");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="border border-blood bg-coal px-4 py-3 text-sm text-bone" role="status">
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        placeholder={t("newsletterPlaceholder")}
        aria-label={t("newsletterPlaceholder")}
        className="w-full min-w-0 border border-smoke bg-coal px-4 py-3 text-sm text-bone placeholder:text-bone-dim/60 focus:border-blood focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-blood px-4 py-3 text-xs font-bold tracking-widest text-bone uppercase transition-colors hover:bg-blood-dark"
      >
        {t("newsletterButton")}
      </button>
    </form>
  );
}
