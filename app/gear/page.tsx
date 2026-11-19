import type { Metadata } from "next";
import { GearGrid } from "@/components/gear/gear-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { gear } from "@/content/gear";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = {
  title: "Gear",
  description: "The laptop, monitor, keyboard and desk setup Bryan Jhade builds with.",
};

export default function GearPage() {
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">What&apos;s on my desk</h1>
      <p className="mt-3 text-sm text-muted">The setup I build on every day, from the laptop to the lamp.</p>
      {gear.map((group) => (
        <section key={group.title} aria-labelledby={`gear-${group.title}`} className="mt-12">
          <SectionHeader id={`gear-${group.title}`} title={group.title} count={group.items.length} />
          <GearGrid items={group.items} />
        </section>
      ))}
    </div>
  );
}
