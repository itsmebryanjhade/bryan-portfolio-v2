import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { ListGroup } from "@/components/ui/list-group";
import { SectionHeader } from "@/components/ui/section-header";
import { resources } from "@/content/resources";
import { isEmpty } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Resources recommended by Bryan Jhade.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Resources</h1>
      <SectionHeader index="01" title="Resources" />
      {isEmpty(resources) ? (
        <EmptyState title="Resources coming soon" body="Useful links and learning resources will be collected here." />
      ) : (
        <ListGroup items={resources} />
      )}
    </div>
  );
}
