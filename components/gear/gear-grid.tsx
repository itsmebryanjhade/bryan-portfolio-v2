import Image from "next/image";
import type { GearItem } from "@/content/gear";
import { FramePlayer } from "./frame-player";
import { ThemeLamp } from "./theme-lamp";
import { TapTile } from "./tap-tile";

function TapTileOrLi({ tap, className, children }: { tap: boolean; className: string; children: React.ReactNode }) {
  return tap ? <TapTile className={className}>{children}</TapTile> : <li className={className}>{children}</li>;
}

/**
 * Gear as tiles on a white card: black-and-white at rest, colour on hover (the site's motif).
 * Items with a `hoverImage` crossfade to it; items with `frames` play them on hover (the laptop opening);
 * `wave` items get a light sweeping across their keys on hover (the keyboard).
 * The `themeLamp` tile has no border, background or clipping, so its light fades out into the page. Tiles share one height;
 * a `wide` item spans two columns (2.07:1 = two tiles plus the gap) so every row fills.
 */
export function GearGrid({ items }: { items: GearItem[] }) {
  return (
    <ul className="m-0 grid list-none grid-flow-dense grid-cols-2 gap-x-4 gap-y-8 p-0 sm:grid-cols-3">
      {items.map((g) => (
        // The lamp has its own switch; every other tile can be tapped on touch to play its hover effect.
        <TapTileOrLi key={g.name} tap={!g.themeLamp} className={`group ${g.wide ? "sm:col-span-2" : ""}`}>
          <div className={`relative ${g.themeLamp ? "" : "overflow-hidden"} ${g.wide ? "aspect-square sm:aspect-[2.07/1]" : "aspect-square"} rounded-card ${
              g.themeLamp
                ? "" // the lamp and its switch stay still on hover
                : "border border-border bg-white transition-[border-color,translate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:border-border-hover motion-reduce:transition-none"
            }`}>
            {g.themeLamp ? (
              <ThemeLamp off={g.image} alt={g.imageAlt} />
            ) : g.frames ? (
              <FramePlayer frames={g.frames} weights={g.frameWeights} alt={g.imageAlt} />
            ) : (
              <>
                <Photo src={g.image} alt={g.imageAlt} className={g.hoverImage ? "group-hover:opacity-0" : ""} />
                {g.hoverImage && <Photo src={g.hoverImage} alt="" className="opacity-0 group-hover:opacity-100" />}
                {g.wave && <KeyWave src={g.image} />}
              </>
            )}
          </div>
          <p className="mt-3 text-sm leading-snug text-fg">{g.name}</p>
          <p className="mt-0.5 text-xs leading-5 text-faint">{g.spec}</p>
        </TapTileOrLi>
      ))}
    </ul>
  );
}

function Photo({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes="(min-width: 640px) 230px, 50vw"
      className={`object-contain p-5 grayscale transition-[filter,opacity,scale] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none ${className}`}
    />
  );
}

/**
 * A backlight wave across the keyboard: a brightened copy of the same photo, laid over it with a
 * screen blend so only the lit legends and keycaps glow, shown through a soft diagonal band that
 * sweeps left to right while hovered. A blurred copy underneath adds bloom. Same box and scale as
 * the photo, so every glow sits exactly on its key. Hidden under reduced motion.
 */
function KeyWave({ src }: { src: string }) {
  const layer =
    "kb-layer pointer-events-none object-contain p-5 opacity-0 mix-blend-screen transition-[opacity,scale] duration-700 ease-[cubic-bezier(.22,1,.36,1)] [mask-image:linear-gradient(105deg,transparent_38%,#000_50%,transparent_62%)] [mask-size:300%_100%] [mask-repeat:no-repeat] [mask-position:100%_0] group-hover:scale-[1.04] group-hover:[animation:kb-wave_2.4s_cubic-bezier(.45,0,.25,1)_infinite] motion-reduce:hidden";
  return (
    <>
      <Image src={src} alt="" aria-hidden="true" fill unoptimized sizes="(min-width: 640px) 470px, 100vw" className={`${layer} [filter:blur(6px)_brightness(2.2)_saturate(1.8)] group-hover:opacity-70`} />
      <Image src={src} alt="" aria-hidden="true" fill unoptimized sizes="(min-width: 640px) 470px, 100vw" className={`${layer} [filter:brightness(1.9)_saturate(1.7)_contrast(1.15)] group-hover:opacity-100`} />
    </>
  );
}
