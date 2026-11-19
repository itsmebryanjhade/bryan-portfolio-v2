"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

const OPEN_MS = 1600; // closed -> open
const CLOSE_MS = 900; // open -> closed: quicker, like letting go of the lid

/** A soft ease in and out: gentle at both ends without lingering on the first frames. */
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * Plays a frame sequence on hover as one continuous motion: every frame is stacked, and the
 * playhead blends each frame into the next instead of cutting, so a handful of stills reads as
 * smooth movement. `weights` (how much each step changes) spread time evenly over the motion,
 * so big jumps are not rushed and near-identical settling frames do not stall. Leaving mid-way
 * reverses from wherever it is. Reduced motion jumps straight to the end.
 */
export function FramePlayer({ frames, alt, weights }: { frames: string[]; alt: string; weights?: number[] }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0); // 0 = closed, 1 = open
  const raf = useRef(0);
  const last = frames.length - 1;

  // Cumulative share of the motion at each frame, from the per-step weights (even if not given).
  const stops = useMemo(() => {
    const w = weights && weights.length === last ? weights : Array<number>(last).fill(1);
    const total = w.reduce((x, y) => x + y, 0);
    return [0, ...w.map((_, i) => w.slice(0, i + 1).reduce((x, y) => x + y, 0) / total)];
  }, [weights, last]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /** Shows the blend for a progress value: frame i underneath, frame i+1 fading in on top. */
  function render(u: number) {
    const el = root.current;
    if (!el) return;
    const s = stops;
    let i = 0;
    while (i < last - 1 && u > s[i + 1]) i++;
    const span = s[i + 1] - s[i] || 1;
    const t = Math.min(1, Math.max(0, (u - s[i]) / span));
    el.querySelectorAll<HTMLElement>("[data-frame-img]").forEach((img, k) => {
      img.style.opacity = k === i ? "1" : k === i + 1 ? String(t) : "0";
      img.style.zIndex = k === i + 1 ? "2" : k === i ? "1" : "0";
    });
    el.dataset.frame = String(t > 0.5 ? i + 1 : i);
  }

  function playTo(end: 0 | 1) {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      progress.current = end;
      render(end);
      return;
    }
    const from = progress.current;
    const duration = Math.abs(end - from) * (end ? OPEN_MS : CLOSE_MS);
    let start: number | null = null;
    const tick = (now: number) => {
      start ??= now;
      const k = duration ? Math.min(1, (now - start) / duration) : 1;
      progress.current = from + (end - from) * ease(k);
      render(progress.current);
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  return (
    <div
      ref={root}
      data-frame="0"
      // Mouse: open on hover, close on leave. Touch has no hover, so a tap opens or closes it instead.
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") playTo(1);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") playTo(0);
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") playTo(progress.current > 0.5 ? 0 : 1);
      }}
      className="absolute inset-0 grayscale transition-[filter,scale] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none"
    >
      {frames.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          unoptimized
          // The first frame shows at rest. The rest load lazily, i.e. only once the tile scrolls near the
          // screen, so visitors who never reach the laptop don't download ~0.8 MB of frames.
          priority={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          data-frame-img=""
          sizes="(min-width: 640px) 230px, 50vw"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
          className="object-contain p-3"
        />
      ))}
    </div>
  );
}
