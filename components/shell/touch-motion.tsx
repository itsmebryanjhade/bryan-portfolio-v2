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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) (e.target as HTMLElement).dataset.inview = "";
          else delete (e.target as HTMLElement).dataset.inview;
        }
      },
      // the middle ~third of the screen
      { rootMargin: "-32% 0px -32% 0px" },
    );
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll(".group:has(.group-hover\\:grayscale-0)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
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
      mo.disconnect();
      clearTimeout(queued);
    };
  }, [pathname]);

  return null;
}
