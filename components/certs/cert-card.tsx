import Image from "next/image";
import type { Certification } from "@/content/types";

export function CertCard({ cert }: { cert: Certification }) {
  return (
    <a
      href={cert.pdf}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-card border border-border bg-card transition-colors duration-150 hover:border-border-hover hover:bg-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-panel">
        <Image
          src={cert.image}
          alt={cert.imageAlt}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
          {cert.issuer} · {cert.year}
        </div>
        <h3 className="mt-1.5 text-[15px] font-medium leading-snug text-fg">{cert.title}</h3>
      </div>
    </a>
  );
}
