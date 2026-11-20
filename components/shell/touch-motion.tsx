"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Phones have no hover, so the site's black-and-white → colour motif would never play there. On touch
 * screens this marks every hover group that has a colour-in (`.group-hover:grayscale-0` inside) with
 * `data-inview` while it sits in the middle band of the screen; globals.css turns that into the same
 * colour-in hover gives on a laptop. Mouse devices are left alone. Renders nothing.
 */
export function TouchMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !window.matchMedia?.("(hover: none)").matches) return;
    // A group colours in while it sits in the middle band of the screen. Groups near the very top or
    // bottom of a page can never scroll into that band, so once the page can't scroll any further
    // their way, they colour in whenever they're fully on screen.
    const inBand = new Set<Element>();
    const onScreen = new Set<Element>();
    const update = (el: Element) => {
      let on = inBand.has(el);
      if (!on && onScreen.has(el)) {
        const r = el.getBoundingClientRect();
        const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
        const atStart = window.scrollY <= 4;
        on = (atEnd && r.top > window.innerHeight / 2) || (atStart && r.bottom < window.innerHeight / 2);
      }
      if (on) (el as HTMLElement).dataset.inview = "";
      else delete (el as HTMLElement).dataset.inview;
    };
    const track = (set: Set<Element>) => (entries: IntersectionObserverEntry[]) => {
      for (const e of entries) {
        if (e.isIntersecting) set.add(e.target);
        else set.delete(e.target);
        update(e.target);
      }
    };
    // the middle ~third of the screen
    const io = new IntersectionObserver(track(inBand), { rootMargin: "-32% 0px -32% 0px" });
    const whole = new IntersectionObserver(track(onScreen), { threshold: 0.9 });
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        onScreen.forEach(update);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll(".group:has(.group-hover\\:grayscale-0)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
        whole.observe(el);
      });
    };
    scan();
    // Pages render and reveal in pieces, so pick up groups that arrive later too.
    let queued = 0;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = window.setTimeout(() => {
        queued = 0;
        scan();
      }, 150);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      whole.disconnect();
      mo.disconnect();
      clearTimeout(queued);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
