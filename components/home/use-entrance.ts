"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
/** Live "reduce motion" preference; false on the server and where matchMedia is missing. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window.matchMedia !== "function") return () => {};
      const mq = window.matchMedia(REDUCE_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => typeof window.matchMedia === "function" && window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

/**
 * A one-time entrance for a home section's centrepiece (the card deck, the certificate print).
 *
 * - "pending": the starting pose, already in the server HTML, so the first paint shows it and nothing
 *   snaps into place later. It's a pose, never hidden content.
 * - "armed": the section is below the fold; extra parts (like list rows) may hide until it's seen.
 * - "go": play the entrance. Fires as the section scrolls into view, or right after load when it's
 *   already on screen.
 * - "done": settled. Reduced motion goes straight here.
 */
export type Entrance = "pending" | "armed" | "go" | "done";

export function useEntrance(ref: React.RefObject<HTMLElement | null>, { delay = 0, settle = 1600 } = {}) {
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Entrance>("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let wait = 0;
    let finish = 0;
    let frame = 0;
    let io: IntersectionObserver | null = null;
    const go = (after: number) => {
      wait = window.setTimeout(() => {
        setPhase("go");
        finish = window.setTimeout(() => setPhase("done"), settle);
      }, after);
    };
    if (reduce || typeof IntersectionObserver === "undefined") {
      frame = requestAnimationFrame(() => setPhase("done"));
    } else if (el.getBoundingClientRect().top < window.innerHeight) {
      go(delay); // already on screen: play as part of the page's own entrance
    } else {
      frame = requestAnimationFrame(() => setPhase((p) => (p === "pending" ? "armed" : p)));
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io?.disconnect();
          go(120); // a beat after the section starts rising in
        },
        { rootMargin: "0px 0px -15% 0px" },
      );
      io.observe(el);
    }
    return () => {
      clearTimeout(wait);
      clearTimeout(finish);
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [ref, reduce, delay, settle]);

  return phase;
}
