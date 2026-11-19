import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { StreakStatus, type Activity } from "./streak-status";
import { Tilt } from "./tilt";
import { profile } from "@/content/profile";

/** The bio fades out after a few lines; the full story lives on the About page. */
const fade = {
  maskImage: "linear-gradient(to bottom, #000 60%, transparent)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent)",
};

/**
 * Portrait "stage": a textured card with the cut-out figure standing in it.
 * The head breaks out over the top edge; the figure is monochrome until hovered, and the whole
 * stage tilts toward the pointer with the portrait in front of the dot grid.
 */
function Stage({ activity }: { activity: Activity | null }) {
  return (
    <Tilt className="group relative mx-auto h-[300px] w-[250px] sm:mx-0">
      <div className="absolute inset-x-0 bottom-0 top-14 overflow-hidden rounded-[22px] border border-border bg-card">
        {/* dot-grid texture, fading toward the bottom */}
        <span
          aria-hidden="true"
          className="absolute -inset-2 bg-[radial-gradient(color-mix(in_oklab,var(--color-fg)_22%,transparent)_1px,transparent_1.2px)] bg-[length:10px_10px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)] [transform:translate(calc(var(--tx,0)*-5px),calc(var(--ty,0)*-4px))] transition-transform duration-500 ease-out motion-reduce:transition-none"
        />
        {/* soft spotlight behind the figure */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-6 h-48 w-48 -translate-x-1/2 rounded-full bg-fg/10 blur-3xl transition-opacity duration-1000 ease-in-out group-hover:opacity-70"
        />
        {/* EB monogram: a mirrored E backed onto a B, spines meeting in the middle */}
        <span
          aria-hidden="true"
          className="absolute -left-2 top-1 flex select-none font-sans text-[120px] font-black leading-none tracking-[-0.02em] text-fg/[0.08] opacity-0 transition-colors duration-1000 ease-in-out [animation:page-fade_700ms_ease-out_900ms_forwards] group-hover:text-fg/[0.14] motion-reduce:opacity-100 motion-reduce:[animation:none]"
        >
          <span className="inline-block -scale-x-100">E</span>
          <span className="-ml-[0.04em]">B</span>
        </span>
        <span className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-pill border border-border bg-bg/70 px-2.5 py-1 text-faint backdrop-blur-sm">
          <StreakStatus activity={activity} />
        </span>
      </div>
      {/* The figure sits above the card; clip only the sides and bottom so the head can break out. */}
      <div className="absolute inset-0 z-10 [clip-path:inset(-40px_1px_1px_1px_round_0_0_22px_22px)]">
        <Image
          src="/profile-cutout-v2.webp"
          alt="Portrait of Bryan Jhade"
          width={407}
          height={514}
          priority
          // Served as-is: a recompressed, downsized copy looked blurry.
          unoptimized
          className="absolute left-1/2 top-0 h-[400px] w-auto max-w-none -translate-x-1/2 grayscale brightness-110 contrast-[1.05] will-change-[filter,translate] [transform:translate(calc(var(--tx,0)*7px),calc(var(--ty,0)*4px))] [transition:filter_1100ms_cubic-bezier(.45,0,.25,1),translate_800ms_cubic-bezier(.22,1,.36,1),transform_500ms_ease-out] group-hover:-translate-y-1.5 group-hover:grayscale-0 motion-reduce:transition-none"
        />
      </div>
    </Tilt>
  );
}

/** `activity` is Bryan's GitHub streak and yearly total, fetched by the page; null shows the Manila clock. */
export function Hero({ activity = null }: { activity?: Activity | null }) {
  const given = profile.name.split(" ");
  const surname = given.pop();
  return (
    <section aria-label="Introduction" className="grid items-center gap-10 sm:grid-cols-[250px_1fr] sm:gap-11">
      <Stage activity={activity} />
      <div>
        <h1 className="font-serif text-[36px] leading-[1.02] tracking-tight text-fg">
          {given.join(" ")} <em>{surname}</em>
        </h1>
        <p className="mt-1 text-[14px] text-faint">{profile.roleLine}</p>
        <div className="mt-7 max-h-[8rem] overflow-hidden" style={fade}>
          <p className="text-[15px] leading-7 text-muted">
            {profile.intro.map((part, i) =>
              typeof part === "string" ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i} className="text-fg">
                  {part.pill}
                </span>
              ),
            )}{" "}
            {profile.introMore}
          </p>
        </div>
        <Link
          href="/about"
          className="group/more mt-2 inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          <ArrowDown
            size={14}
            strokeWidth={1.6}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/more:translate-y-0.5 motion-reduce:transition-none"
          />
          More about me
        </Link>
      </div>
    </section>
  );
}
