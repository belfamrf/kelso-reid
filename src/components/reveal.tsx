"use client";

import { useEffect, type ReactNode } from "react";

// Menambahkan animasi masuk ke elemen yang ditandai `data-motion`.
// Atribut hanya diisi oleh JavaScript, jadi tanpa JavaScript konten tetap terlihat
// dan tanpa animasi. Reduced motion: tidak ada yang disembunyikan sama sekali.
export function Reveal({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    if (items.length === 0) return;

    const seen = new Map<Element | null, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const index = seen.get(el.parentElement) ?? 0;
          seen.set(el.parentElement, index + 1);
          el.style.transitionDelay = `${Math.min(index, 3) * 60}ms`;
          el.dataset.motion = "visible";
          observer.unobserve(el);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of items) {
      el.dataset.motion = "pending";
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
