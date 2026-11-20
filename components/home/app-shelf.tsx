"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { FileText, Globe } from "lucide-react";
import { HalalanLogo } from "@/components/ui/brand-icons";
import type { Project } from "@/content/types";

type Action = { kind: "play-soon" } | { kind: "web"; href: string } | { kind: "case"; href: string };

export type ShelfItem = {
  project: Project;
  meta: string;
  blurb: string;
  /** Solid brand gradient for the card. */
  gradient: string;
  /** Image path, or "halalan" for the vector mark. */
  logo: string;
  actions: Action[];
};

function Logo({ logo, className }: { logo: string; className: string }) {
  if (logo === "halalan") return <HalalanLogo className={className} />;
  return (
    <span className={`relative block ${className}`}>
      <Image src={logo} alt="" fill sizes="96px" unoptimized className="object-contain" />
    </span>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 3.2v17.6c0 .6.6 1 1.1.7L20 13.1c.5-.3.5-1 0-1.3L6.1 2.5C5.6 2.2 5 2.6 5 3.2z" fill="currentColor" />
    </svg>
  );
}

const badge =
  "relative z-10 inline-flex h-11 items-center gap-2.5 rounded-[10px] border border-white/20 bg-black/85 pl-3 pr-4 text-left text-white transition-[transform,translate,scale,rotate,background-color] duration-200 hover:-translate-y-0.5 hover:bg-black motion-reduce:transition-none";

function Badge({ action }: { action: Action }) {
  if (action.kind === "play-soon") {
    return (
      <span className={`${badge} cursor-default`}>
        <PlayMark />
        <span className="leading-none">
          <span className="block text-[9px] uppercase tracking-[0.08em] text-white/70">Get it on</span>{" "}
          <span className="mt-0.5 block text-[15px] font-medium">Google Play</span>
        </span>
        <span className="absolute -right-2 -top-2 rounded-pill bg-white px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-black">
          Soon
        </span>
      </span>
    );
  }
  const web = action.kind === "web";
  const inner = (
    <>
      {web ? <Globe size={17} strokeWidth={1.6} aria-hidden="true" /> : <FileText size={17} strokeWidth={1.6} aria-hidden="true" />}
      <span className="leading-none">
        <span className="block text-[9px] uppercase tracking-[0.08em] text-white/70">{web ? "Open on" : "Read the"}</span>{" "}
        <span className="mt-0.5 block text-[15px] font-medium">{web ? "the Web" : "Case study"}</span>
      </span>
    </>
  );
  return web ? (
    <a href={action.href} target="_blank" rel="noreferrer" className={badge}>
      {inner}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link href={action.href} className={badge}>
      {inner}
    </Link>
  );
}

/** A brand-coloured card. The front card tilts slightly toward the pointer. */
export function ShelfCard({
  item,
  front,
  banner = false,
}: {
  item: ShelfItem;
  front: boolean;
  /** Wide, short banner proportions. */
  banner?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || !front || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      inert={!front || undefined}
      style={{ background: item.gradient }}
      className={`group relative isolate flex h-full flex-col ${banner ? "min-h-[236px]" : "min-h-[300px]"} overflow-hidden rounded-[22px] p-6 text-white shadow-[0_30px_60px_-28px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/10 transition-transform duration-300 ease-out`}
    >
      {/* grain dots and a big faded logo, cropped at the corner */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] bg-[length:12px_12px] [mask-image:linear-gradient(to_bottom_left,#000,transparent_70%)]"
      />
      <span aria-hidden="true" className="absolute -bottom-10 -right-10 -z-10 rotate-[-12deg] opacity-[0.14] mix-blend-luminosity">
        <Logo logo={item.logo} className="h-52 w-52" />
      </span>
      {/* The whole card opens the project page; the badges sit above it and open their own links. */}
      <Link
        href={`/projects/${item.project.slug}`}
        aria-label={`${item.project.title}: project details`}
        className="absolute inset-0 rounded-[22px] focus-visible:outline-offset-[-3px]"
      />

      <div className="flex items-center gap-3.5">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-[24%] bg-white p-2 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
          <Logo logo={item.logo} className="h-full w-full" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{item.meta}</p>
          <h3 className="mt-1.5 font-serif text-[30px] leading-none tracking-tight">{item.project.title}</h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/80">{item.blurb}</p>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        {item.actions.map((a) => (
          <Badge key={a.kind} action={a} />
        ))}
      </div>
    </div>
  );
}

const EASE = "cubic-bezier(.22,1,.36,1)";

/** The hand's laptop-size stage; narrower screens scale it down to fit. */
const STAGE_W = 640;
const STAGE_H = 330;

/** Scale (at most 1) that fits a `base`-wide layout into the element's width; follows resizes. */
function useFitScale(base: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const fit = () => setScale(Math.min(1, el.clientWidth / base) || 1);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [base]);
  return { ref, scale };
}

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
/** Live "reduce motion" preference; false on the server and where matchMedia is missing. */
function usePrefersReducedMotion() {
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
 * Phones: a vertical deck. The front card sits full width in the middle; the one before peeks out
 * above it (leaning right) and the one after below (leaning left), each a little smaller, so the
 * stack looks casually scattered and the sides stay clear.
 */
function deckPose(offset: number) {
  if (offset === 0) return { transform: "translate(-50%, -50%) rotate(0deg) scale(1)", zIndex: 30, filter: "none" };
  const up = offset < 0;
  return {
    // Slightly scattered: the card above leans out to the right, the one below to the left.
    transform: `translate(calc(-50% ${up ? "+" : "-"} 14px), calc(-50% ${up ? "-" : "+"} 96px)) rotate(${up ? 3.5 : -3}deg) scale(0.9)`,
    zIndex: 20 - Math.abs(offset),
    filter: "brightness(0.78)",
  };
}

/** Pose in the hand by offset from the top card: -1 tucked left, 1 tucked right. */
function fanPose(offset: number, lean: boolean) {
  if (offset === 0) return { transform: "translateX(-50%) translateY(0) rotate(0deg) scale(1)", zIndex: 30, filter: "none" };
  const side = Math.sign(offset);
  // Deliberately uneven: the left card drops lower and lies flatter, the right sits higher and tilts more.
  const left = side < 0;
  const out = (left ? 46 : 42) - (lean ? 4 : 0);
  const y = (left ? 42 : 10) - (lean ? 10 : 0);
  const r = (left ? -6 : 11) * (lean ? 0.6 : 1);
  return {
    transform: `translateX(calc(-50% + ${side * out}%)) translateY(${y}px) rotate(${r}deg) scale(${left ? 0.88 : 0.86})`,
    zIndex: 20 - Math.abs(offset),
    filter: "brightness(0.82)",
  };
}

/**
 * A hand of cards: three tall cards fanned out, the highlighted one standing on top in the middle,
 * the others tilted outward behind it over a soft glow in their own colours. Click a side card (or use
 * the dots, or swipe on touch) to bring it on top; the hand slowly cycles on its own until someone
 * interacts. Phones get a vertical deck instead: full-size front card, the others peeking above
 * and below, so the sides stay clear.
 */
export function AppShelf({ items }: { items: ShelfItem[] }) {
  const [top, setTop] = useState(0);
  const [lean, setLean] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const swipe = useRef<number | null>(null);
  const reduce = usePrefersReducedMotion();
  const n = items.length;
  const { ref: frameRef, scale } = useFitScale(STAGE_W);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setTop((t) => (t + 1) % n), 5500);
    return () => clearInterval(id);
  }, [paused, reduce, n]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setTop((t) => (t + 1) % n);
          if (e.key === "ArrowLeft") setTop((t) => (t - 1 + n) % n);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") swipe.current = e.clientX;
        }}
        onPointerUp={(e) => {
          // A sideways swipe on touch moves through the hand, like the dots.
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) < 40) return;
          setPaused(true);
          setTop((t) => (t + (dx < 0 ? 1 : -1) + n) % n);
        }}
        ref={frameRef}
        // Phone deck vs laptop fan is chosen in CSS (sm:), so the first paint is already right on a
        // phone; JS only supplies the laptop fan's fit-to-width scale.
        style={{ "--stage-h": `${STAGE_H * scale}px`, "--s": scale } as React.CSSProperties}
        className="relative block h-[480px] touch-pan-y sm:h-[var(--stage-h)]"
      >
        {/* Laptops: the fanned hand, laid out at full size and scaled down if the column is narrower.
            Phones: a vertical deck at full card size (see deckPose). */}
        <div
          className="absolute inset-0 sm:inset-auto sm:left-1/2 sm:top-0 sm:h-[330px] sm:w-[640px] sm:origin-top sm:[transform:translateX(-50%)_scale(var(--s))]"
        >
        {items.map((item, i) => {
          let offset = (i - top + n) % n;
          if (offset > n / 2) offset -= n;
          const isTop = offset === 0;
          const fan = fanPose(offset, lean === i);
          const deck = deckPose(offset);
          return (
            <article
              key={item.project.slug}
              aria-label={item.project.title}
              onMouseEnter={() => setLean(i)}
              onMouseLeave={() => setLean((v) => (v === i ? null : v))}
              style={
                {
                  "--pose-deck": deck.transform,
                  "--pose-fan": fan.transform,
                  "--shade-deck": deck.filter,
                  "--shade-fan": fan.filter,
                  zIndex: fan.zIndex,
                  transition: `transform 800ms ${EASE}, filter 800ms ${EASE}`,
                } as React.CSSProperties
              }
              className="absolute left-1/2 top-1/2 h-[300px] w-[94%] origin-center [filter:var(--shade-deck)] [transform:var(--pose-deck)] motion-reduce:!transition-none sm:top-4 sm:h-[250px] sm:w-[420px] sm:origin-bottom sm:[filter:var(--shade-fan)] sm:[transform:var(--pose-fan)]"
            >
              {/* soft colour glow behind the card */}
              <span
                aria-hidden="true"
                style={{ background: item.gradient }}
                className={`pointer-events-none absolute -inset-6 -z-10 rounded-full blur-3xl transition-opacity duration-700 ${isTop ? "opacity-25" : "opacity-40"}`}
              />
              <ShelfCard item={item} front={isTop} banner />
              {!isTop && (
                <button
                  type="button"
                  onClick={() => setTop(i)}
                  aria-label={`Bring ${item.project.title} to the top`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[22px]"
                />
              )}
            </article>
          );
        })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5 sm:mt-8">
        {items.map((item, i) => (
          <button
            key={item.project.slug}
            type="button"
            onClick={() => setTop(i)}
            aria-label={`Show ${item.project.title}`}
            aria-current={i === top ? "true" : undefined}
            className={`h-1.5 rounded-pill transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              i === top ? "w-6 bg-fg" : "w-1.5 bg-border-hover hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
