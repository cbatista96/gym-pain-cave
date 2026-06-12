"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Simulated submit — wire to your email/CRM endpoint when ready.
    setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <div className="border-2 border-blood bg-ash p-8 text-center" role="status">
        <p className="font-display text-2xl tracking-wide text-bone uppercase">{t("success")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-smoke bg-ash px-4 py-3.5 text-sm text-bone placeholder:text-bone-dim/60 focus:border-blood focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-bold tracking-[0.2em] text-bone-dim uppercase">
            {t("name")}
          </span>
          <input type="text" name="name" required placeholder={t("namePlaceholder")} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold tracking-[0.2em] text-bone-dim uppercase">
            {t("email")}
          </span>
          <input type="email" name="email" required placeholder={t("emailPlaceholder")} className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-xs font-bold tracking-[0.2em] text-bone-dim uppercase">
          {t("message")}
        </span>
        <textarea name="message" required rows={5} placeholder={t("messagePlaceholder")} className={inputClass} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blood px-6 py-4 text-sm font-bold tracking-[0.2em] text-bone uppercase transition-all hover:bg-blood-dark disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
