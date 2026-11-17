import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { ListGroup } from "@/components/ui/list-group";
import { SectionHeader } from "@/components/ui/section-header";
import { gear } from "@/content/gear";
import { isEmpty } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gear",
  description: "Hardware and software Bryan Jhade uses.",
};

export default function GearPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Gear</h1>
      <SectionHeader index="01" title="Gear" />
      {isEmpty(gear) ? (
        <EmptyState title="Setup list coming soon" body="My hardware and software setup will be listed here." />
      ) : (
        <ListGroup items={gear} />
      )}
    </div>
  );
}
