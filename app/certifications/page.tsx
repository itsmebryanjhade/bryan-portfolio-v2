import type { Metadata } from "next";
import Image from "next/image";
import { badges } from "@/content/badges";
import { certifications } from "@/content/certifications";
import type { Certification } from "@/content/types";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";
import { CertGrid } from "@/components/certs/cert-grid";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certificates and badges earned by Bryan Jhade.",
};

const topics: Certification["topic"][] = ["AI", "Computer science", "Game development"];
const slug = (s: string) => `certs-${s.replace(/\W+/g, "-").toLowerCase()}`;
const count = (n: number) => String(n).padStart(2, "0");

function GroupHeading({ id, label, n }: { id: string; label: string; n: number }) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
      <h2 id={id} className="text-xs text-faint">
        {label}
      </h2>
      <span className="font-mono text-[11px] text-faint">{count(n)}</span>
    </div>
  );
}

export default function CertificationsPage() {
  const standalone = badges.filter((b) => !b.certification);
  const verified = badges.flatMap((b) => (b.certification ? [b.certification] : []));
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">
        Proof of practice
      </h1>
      <p className="mt-3 text-sm text-muted">
        Courses and programs I finished, grouped by topic. Click a certificate to view it.
      </p>

      {topics.map((topic) => {
        const items = certifications.filter((c) => c.topic === topic);
        if (items.length === 0) return null;
        return (
          <section key={topic} aria-labelledby={slug(topic)} className="mt-12">
            <GroupHeading id={slug(topic)} label={topic} n={items.length} />
            <CertGrid certs={items} verified={verified} />
          </section>
        );
      })}

      <section aria-labelledby="certs-badges" className="mt-12">
        <GroupHeading id="certs-badges" label="Google AI course badges" n={standalone.length} />
        <ul aria-label="Badges" className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
          {standalone.map((b) => (
            <li
              key={b.name}
              className="group flex flex-col items-center gap-2 rounded-card border border-border bg-card px-3 py-4 text-center transition-colors duration-150 hover:border-border-hover"
            >
              <Image src={b.image} alt="" width={44} height={44} unoptimized className="h-11 w-11 object-contain grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
              <span className="text-[12px] leading-snug text-muted">{b.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
