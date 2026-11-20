"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** How long a tapped photo stays in colour before it fades back to black and white. */
export const LIT_MS = 5000;

/** The nearest hover group around `target` that holds a colour-in photo (`.group-hover:grayscale-0`). */
function photoGroup(target: EventTarget | null): HTMLElement | null {
  let el = target instanceof Element ? target.closest<HTMLElement>(".group") : null;
  while (el) {
    if (el.querySelector(".group-hover\\:grayscale-0")) return el;
    el = el.parentElement?.closest<HTMLElement>(".group") ?? null;
  }
  return null;
}

/**
 * Phones have no hover, so the site's black-and-white → colour motif would never play there. On touch
 * screens, tapping a photo marks its hover group with `data-lit` for {@link LIT_MS}; globals.css turns
 * that into the same colour-in hover gives on a laptop, and the photo fades back to black and white
 * when it's removed. Photos inside links react to the click, after Safari has already decided the tap
 * (anything that starts animating under the finger before that can make iPhone Safari drop a link
 * tap); plain photos react to the finger lifting, since Safari sends them no click. Mouse devices are
 * left alone. Renders nothing.
 */
export function TouchMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia?.("(hover: none)").matches) return;
    const timers = new Map<HTMLElement, number>();
    const light = (group: HTMLElement) => {
      group.dataset.lit = "";
      clearTimeout(timers.get(group));
      timers.set(
        group,
        window.setTimeout(() => {
          delete group.dataset.lit;
          timers.delete(group);
        }, LIT_MS),
      );
    };
    const isLink = (group: HTMLElement) => !!(group.closest("a, button") || group.querySelector("a, button"));
    // Photos inside links or buttons: on the click, which Safari fires for those once the tap is decided.
    const onClick = (e: MouseEvent) => {
      const group = photoGroup(e.target);
      if (group && isLink(group)) light(group);
    };
    // Plain photos: iPhone Safari sends no click for a tap on something that isn't a link or button, so
    // read the tap from the finger itself: down and up in about the same spot, quickly (not a scroll).
    let down: { x: number; y: number; t: number } | null = null;
    const onDown = (e: PointerEvent) => {
      down = e.pointerType === "mouse" ? null : { x: e.clientX || 0, y: e.clientY || 0, t: Date.now() };
    };
    const onUp = (e: PointerEvent) => {
      const start = down;
      down = null;
      if (!start || Date.now() - start.t > 600) return;
      if (Math.hypot((e.clientX || 0) - start.x, (e.clientY || 0) - start.y) > 10) return;
      const group = photoGroup(e.target);
      if (group && !isLink(group)) light(group);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      timers.forEach((id, group) => {
        clearTimeout(id);
        delete group.dataset.lit;
      });
    };
  }, [pathname]);

  return null;
}
