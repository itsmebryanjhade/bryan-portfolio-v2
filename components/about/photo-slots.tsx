import Image from "next/image";

/** `position` sets the crop focus (CSS object-position), for photos whose subject is off-centre. */
export type AboutPhoto = { src: string; alt: string; caption: string; position?: string };

const PHOTOS: AboutPhoto[] = [
  { src: "/images/about/at-work.webp", alt: "Bryan coding at his desk at night, two monitors and a laptop lit up", caption: "At work" },
  { src: "/images/about/on-stage.webp", alt: "Bryan speaking into a microphone at a podium during an event", caption: "On stage" },
  { src: "/images/about/behind-the-lens-filming.webp", alt: "Bryan setting up a camera on a tripod to film, a microphone on the table beside him", caption: "Behind the lens", position: "68% center" },
];

/**
 * A contact-sheet row of three photos. Black-and-white at rest, developing into colour on hover,
 * the same move as the hero photo.
 */
export function PhotoSlots({ photos = PHOTOS }: { photos?: AboutPhoto[] }) {
  return (
    <ul aria-label="Photos" className="m-0 grid list-none grid-cols-3 gap-3 p-0">
      {photos.map((p) => (
        <li key={p.src} className="group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-border bg-card">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              unoptimized
              sizes="(min-width: 640px) 220px, 33vw"
              style={p.position ? { objectPosition: p.position } : undefined}
              className="object-cover grayscale transition-[filter,transform,translate,scale,rotate] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none"
            />
          </div>
          <p className="mt-2 text-xs text-faint">{p.caption}</p>
        </li>
      ))}
    </ul>
  );
}
