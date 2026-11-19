"use client";

import { useRef } from "react";

/**
 * Tilts its contents gently toward the pointer. It writes the pointer position as --tx / --ty
 * (-1 to 1) on itself; children use those for depth (the portrait shifts forward, the dot grid
 * back). Eases back to rest on leave. Mouse and pen only, and nothing under reduced motion.
 */
export function Tilt({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--ty", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  }
  function leave() {
    ref.current?.style.setProperty("--tx", "0");
    ref.current?.style.setProperty("--ty", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`${className} [transform:perspective(900px)_rotateX(calc(var(--ty,0)*-5deg))_rotateY(calc(var(--tx,0)*6deg))] transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none`}
    >
      {children}
    </div>
  );
}
