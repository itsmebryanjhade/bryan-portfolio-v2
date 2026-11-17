import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { ListGroup } from "@/components/ui/list-group";
import { SectionHeader } from "@/components/ui/section-header";
import { links } from "@/content/links";
import { isEmpty } from "@/lib/content";

export const metadata: Metadata = {
  title: "Links",
  description: "Where to find Bryan Jhade online.",
};

export default function LinksPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Links</h1>
      <SectionHeader index="01" title="Links" />
      {isEmpty(links) ? (
        <EmptyState title="Links" body="Links coming soon." />
      ) : (
        <ListGroup items={links} />
      )}
    </div>
  );
}
