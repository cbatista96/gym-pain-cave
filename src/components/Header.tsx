"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "classes", href: "/classes" },
  { key: "plans", href: "/plans" },
  { key: "trainers", href: "/trainers" },
  { key: "membership", href: "/membership" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" }
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-smoke bg-coal/95 backdrop-blur"
          : "border-transparent bg-gradient-to-b from-coal/90 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t("home")} className="text-bone transition-colors hover:text-blood">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map(({ key, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className={`relative text-sm font-semibold tracking-widest uppercase transition-colors hover:text-blood ${
                  active ? "text-blood" : "text-bone"
                }`}
              >
                {t(key)}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full -skew-x-12 bg-blood" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Link
            href="/membership"
            className="bg-blood px-5 py-2.5 text-sm font-bold tracking-widest text-bone uppercase transition-all hover:-translate-y-0.5 hover:bg-blood-dark"
          >
            {t("join")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-bone transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-bone transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-coal transition-[max-height] duration-400 lg:hidden ${
          open ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pt-2 pb-6">
          {NAV_ITEMS.map(({ key, href }, i) => (
            <Link
              key={key}
              href={href}
              className={`font-display border-b border-smoke py-3 text-2xl tracking-wide uppercase transition-colors hover:text-blood ${
                pathname === href ? "text-blood" : "text-bone"
              }`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href="/membership"
            className="mt-4 bg-blood px-5 py-3 text-center text-sm font-bold tracking-widest text-bone uppercase"
          >
            {t("join")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
