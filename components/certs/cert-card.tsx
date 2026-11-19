import Image from "next/image";
import type { Certification } from "@/content/types";

function issuerMark(issuer: string): string {
  const first = issuer.split("/")[0].trim();
  if (/cisco/i.test(first)) return "CI";
  return first.charAt(0).toUpperCase();
}

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
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex h-[26px] min-w-[26px] items-center justify-center rounded-pill border border-border bg-panel px-1 font-mono text-[10px] text-muted">
            {issuerMark(cert.issuer)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{cert.issuer} · {cert.year}</span>
        </div>
        <h3 className="mt-2 text-[15px] font-medium leading-snug text-fg">
          {cert.title}
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </h3>
      </div>
    </a>
  );
}
