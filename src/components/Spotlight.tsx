"use client";

import { useEffect, useRef } from "react";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Adds .is-centered while the element crosses the middle band of the viewport
 * on touch/small screens, so grayscale media inside (.spotlight-color) regains
 * color while the user scrolls past it. Unlike Reveal, it applies no
 * entrance animation — meant for full-bleed backgrounds.
 */
export default function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const touchish = window.matchMedia("(hover: none), (max-width: 767px)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-centered", touchish.matches && entry.isIntersecting);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
