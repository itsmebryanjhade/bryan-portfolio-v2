"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Develops its contents in once, the first time they scroll into view: a short rise out of a
 * soft blur (no blur on phones, where it's costly to draw), the same motion as the page entrance. Anything already on screen when the page
 * loads shows immediately, content is never hidden before the script runs, and reduced motion
 * skips the effect.
 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // "idle" until mounted (so server HTML is always visible), then "waiting" until seen.
  const [state, setState] = useState<"idle" | "waiting" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: leave it be
    const show = () => setState("in");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    const id = requestAnimationFrame(() => setState((s) => (s === "idle" ? "waiting" : s)));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      className="data-[reveal=waiting]:translate-y-[18px] data-[reveal=waiting]:opacity-0 sm:data-[reveal=waiting]:blur-[6px] data-[reveal=in]:transition-[opacity,translate,filter] data-[reveal=in]:duration-700 data-[reveal=in]:ease-[cubic-bezier(.22,1,.36,1)]"
    >
      {children}
    </div>
  );
}
