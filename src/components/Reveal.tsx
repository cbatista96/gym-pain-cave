"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Where the element slides in from. */
  direction?: "up" | "left" | "right";
  /** If true, animate only the first time instead of every time it re-enters the viewport. */
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  once = false
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          if (once) observer.disconnect();
        } else if (!once) {
          // Re-arm so the animation replays when scrolling back (up or down).
          el.classList.remove("is-visible");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const directionClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "";

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
