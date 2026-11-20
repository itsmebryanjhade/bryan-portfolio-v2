"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Instant answer to a tap on a link to another page: the current page dims right away (globals.css,
 * `html[data-leaving]`), so the tap visibly lands even while a slower phone is still building the next
 * page. The new page clears it the moment it arrives, and plays its own entrance. Renders nothing.
 */
export function NavFeedback() {
  const pathname = usePathname();

  useEffect(() => {
    delete document.documentElement.dataset.leaving;
  }, [pathname]);

  useEffect(() => {
    let fallback = 0;
    // Capture phase: next/link cancels the native click for its own navigation, so check before it does.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      document.documentElement.dataset.leaving = "";
      // Never leave the page dimmed if a navigation doesn't happen after all.
      clearTimeout(fallback);
      fallback = window.setTimeout(() => delete document.documentElement.dataset.leaving, 4000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(fallback);
    };
  }, []);

  return null;
}
