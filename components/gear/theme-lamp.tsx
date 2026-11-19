"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { toggleTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerSnapshot = (): Theme => "dark";

/** Warm, low-saturation lamplight, so it reads as light rather than an accent colour. */
const WARM = "255 214 168";
const warm = (a: number) => `rgb(${WARM} / ${a})`;

/**
 * The lamp tile doubles as a secret theme switch: dark theme = lamp on in a dark room, light
 * theme = lamp off on white. Clicking the tile (or the small switch) flips the whole site's
 * theme, and the sidebar toggle flips the lamp, since both follow <html data-theme>.
 *
 * The lamp is a transparent photo; the light is drawn around it in soft layers with no hard
 * edges: a hot spot under the head, a wide downlight that fades out before the table, a sheen
 * down the pole, light caught on the top of the base, a faint pool on the table and a little
 * ambient glow in the room. Positions are percentages of the lamp photo (117 x 431): head 2-7%
 * from the top, pole 44-55% across, base 72-97%. Widths are given in lamp heights via the
 * `--h` variable, since the photo itself is narrow.
 *
 * The tile itself is see-through, so the lamp stands right on the page: the site's own theme
 * change darkens the room. Turning on, the light catches with a quick flicker; turning off, it dies.
 */
export function ThemeLamp({ off, alt }: { off: string; alt: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const on = theme === "dark";
  // No transitions until after the first paint, so loading in light mode doesn't animate "off".
  const [ready, setReady] = useState(false);
  // Only play the flicker when the switch is flipped, not when the page loads with the lamp on.
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const still = ready ? "" : "!transition-none";
  const light = `pointer-events-none transition-opacity ease-in motion-reduce:transition-none motion-reduce:[animation:none] ${still} ${
    on ? "opacity-100 duration-300" : "opacity-0 duration-[420ms]"
  } ${on && flipped ? "[animation:lamp-on_900ms_ease-out_200ms_backwards]" : ""}`;
  // A layer centred on the lamp, sized in lamp heights.
  const glow = (top: string, w: number, h: string, background: string, extra = "") => (
    <span
      className={`absolute left-1/2 -translate-x-1/2 rounded-[50%] ${extra}`}
      style={{ top, width: `calc(var(--h) * ${w})`, height: h, background }}
    />
  );

  return (
    <>
      {/* the room light: larger than the tile and not clipped by it, so it spreads past the tile and
          fades into the page with no edge anywhere. Many stops keep the falloff smooth. */}
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-[12%] aspect-square w-[190%] -translate-x-1/2 -translate-y-1/2 ${light}`}
        style={{
          background: `radial-gradient(circle closest-side, ${warm(0.17)}, ${warm(0.12)} 18%, ${warm(0.075)} 36%, ${warm(0.04)} 54%, ${warm(0.018)} 72%, ${warm(0.006)} 88%, transparent)`,
        }}
      />

      <span className="absolute inset-x-0 bottom-[5%] top-[5%] flex justify-center [container-type:size]">
        <span className="relative h-full [--h:100cqh]" style={{ aspectRatio: "117 / 431" }}>
          {/* light behind the lamp */}
          <span aria-hidden="true" className={`absolute inset-0 ${light}`}>
            {/* the downlight: a tall ellipse around the upper lamp that reaches zero before its own
                edges (closest-side), so no edge of it can ever show; the hot spot below adds the
                brightness under the head */}
            {glow("-16%", 1.05, "84%", `radial-gradient(closest-side, ${warm(0.3)}, ${warm(0.17)} 30%, ${warm(0.08)} 55%, ${warm(0.025)} 78%, transparent)`, "blur-lg")}
            {glow("2%", 0.42, "12%", `radial-gradient(closest-side, ${warm(0.55)}, transparent)`, "blur-lg")}
            {glow("92%", 0.75, "8%", `radial-gradient(closest-side, ${warm(0.2)}, transparent)`, "blur-xl")}
          </span>

          <Image
            src={off}
            alt={alt}
            fill
            unoptimized
            sizes="(min-width: 640px) 80px, 20vw"
            className="object-contain"
          />

          {/* light on the lamp itself, in front of it */}
          <span aria-hidden="true" className={`absolute inset-0 mix-blend-screen ${light}`}>
            {/* the emitter under the head */}
            <span
              className="absolute left-[8%] top-[6.2%] h-[1.4%] w-[84%] rounded-[50%] blur-[1.5px]"
              style={{ background: "rgb(255 244 226)", boxShadow: `0 2px 10px 3px ${warm(0.6)}` }}
            />
            {/* sheen down the pole, fading as it gets further from the light */}
            <span
              className="absolute left-[45%] top-[7%] h-[55%] w-[9%]"
              style={{ background: `linear-gradient(to bottom, ${warm(0.6)}, ${warm(0.15)} 40%, transparent)` }}
            />
            {/* light caught on the top of the base */}
            <span
              className="absolute left-[10%] top-[70.5%] h-[3.5%] w-[80%] rounded-[50%] blur-[2px]"
              style={{ background: `radial-gradient(closest-side, ${warm(0.4)}, transparent)` }}
            />
          </span>
        </span>
      </span>

      <button
        type="button"
        onClick={() => {
          setFlipped(true);
          toggleTheme();
        }}
        aria-pressed={on}
        aria-label={on ? "Turn the lamp off (switch to light theme)" : "Turn the lamp on (switch to dark theme)"}
        className="absolute inset-0 z-10 cursor-pointer rounded-card focus-visible:outline-offset-[-3px]"
      >
        {/* the small switch in the corner */}
        <span
          aria-hidden="true"
          className={`absolute bottom-3 right-3 flex h-[18px] w-[32px] items-center rounded-full border p-[2px] transition-colors duration-500 motion-reduce:transition-none ${still} ${
            on ? "border-white/25 bg-white/10" : "border-black/15 bg-black/5"
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full transition-[translate,background-color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${still} ${
              on ? "translate-x-[14px] bg-[rgb(255_226_190)] shadow-[0_0_8px_rgb(255_214_168/0.8)]" : "translate-x-0 bg-black/40"
            }`}
          />
        </span>
      </button>
    </>
  );
}
