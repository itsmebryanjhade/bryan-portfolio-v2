import type { Metadata } from "next";
import Image from "next/image";
import { CertCard } from "@/components/certs/cert-card";
import { SectionHeader } from "@/components/ui/section-header";
import { badges } from "@/content/badges";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certificates and badges earned by Bryan Jhade.",
};

function BadgeImage({ image }: { image: string }) {
  return <Image src={image} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />;
}

export default function CertificationsPage() {
  const standalone = badges.filter((b) => !b.certification);
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Certifications</h1>
      <SectionHeader index="01" title="Certificates" />
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => {
          const linked = badges.filter((b) => b.certification === c.slug);
          return (
            <li key={c.slug} className="flex flex-col gap-2">
              <CertCard cert={c} />
              {linked.map((b) => (
                <div key={b.name} className="flex items-center gap-3 rounded-card border border-border bg-card px-3 py-2">
                  <BadgeImage image={b.image} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Badge · {b.name}</span>
                </div>
              ))}
            </li>
          );
        })}
      </ul>
      <div className="mt-12">
        <SectionHeader index="02" title="Badges" />
        <ul aria-label="Badges" className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {standalone.map((b) => (
            <li key={b.name} className="flex items-center gap-3 rounded-card border border-border bg-card p-3">
              <BadgeImage image={b.image} />
              <div>
                <div className="text-[14px] leading-snug text-fg">{b.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">{b.issuer}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
