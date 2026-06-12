"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { PlanId } from "@/data/site";

type PlanCardProps = {
  planId: PlanId;
  popular: boolean;
  index?: number;
};

export default function PlanCard({ planId, popular, index = 0 }: PlanCardProps) {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const features = t.raw(`plans.${planId}.features`) as string[];

  async function handleCheckout() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, locale })
      });
      if (!res.ok) throw new Error("checkout failed");
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <article
      className={`relative flex h-full flex-col border p-8 transition-transform duration-300 hover:-translate-y-2 ${
        popular
          ? "border-blood bg-gradient-to-b from-blood/15 to-ash shadow-[0_0_60px_-15px_rgba(225,6,0,0.5)]"
          : "border-smoke bg-ash"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {popular && (
        <span className="font-display absolute -top-4 left-1/2 -translate-x-1/2 bg-blood px-4 py-1.5 text-sm tracking-widest whitespace-nowrap text-bone uppercase">
          {tCommon("popular")}
        </span>
      )}

      <h3 className="font-display text-2xl tracking-wide text-bone uppercase">
        {t(`plans.${planId}.name`)}
      </h3>
      <p className="mt-1 text-sm text-bone-dim">{t(`plans.${planId}.description`)}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-blood">$</span>
        <span className="font-display text-6xl tracking-tight text-bone">
          {t(`plans.${planId}.price`)}
        </span>
        <span className="text-sm text-bone-dim">{tCommon("perMonth")}</span>
      </p>

      <ul className="mt-7 flex-1 space-y-3 border-t border-smoke pt-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-bone-dim">
            <span className="mt-1 h-2 w-2 shrink-0 -skew-x-12 bg-blood" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`mt-8 w-full px-6 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all disabled:cursor-wait disabled:opacity-60 ${
          popular
            ? "bg-blood text-bone hover:bg-blood-dark"
            : "border-2 border-bone text-bone hover:border-blood hover:bg-blood"
        }`}
      >
        {loading ? t("processing") : t("ctaJoin")}
      </button>

      {error && (
        <p className="mt-3 text-center text-xs text-blood" role="alert">
          {t("checkoutError")}
        </p>
      )}
    </article>
  );
}
