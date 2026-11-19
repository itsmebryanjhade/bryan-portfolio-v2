import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { resources } from "@/content/resources";
import type { ListItem } from "@/content/types";
import { isEmpty } from "@/lib/content";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = {
  title: "Resources",
  description: "Courses, videos, documentation and agent skills connected to Bryan Jhade's learning and development workflow.",
};

/** "https://www.youtube.com/@Fireship" -> "youtube.com" */
function host(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function ResourceRow({ item }: { item: ListItem }) {
  return (
    <li className="border-t border-border">
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="group -mx-3 flex items-start gap-4 rounded-[12px] px-3 py-3.5 transition-colors duration-150 hover:bg-hover/50"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-fg">{item.name}</span>
          {item.note && <span className="mt-0.5 block text-[13px] leading-5 text-muted">{item.note}</span>}
        </span>
        <span className="mt-0.5 hidden flex-none text-xs text-faint transition-colors duration-150 group-hover:text-muted sm:block">
          {host(item.href!)}
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={1.6}
          aria-hidden="true"
          className="mt-0.5 flex-none text-faint transition-[translate,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg motion-reduce:transition-none"
        />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  );
}

export default function ResourcesPage() {
  const groups = [...new Set(resources.map((r) => r.category))];
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">My Learning Shelf</h1>
      <p className="mt-3 text-sm text-muted">
        Courses from my learning path, tools in my workflow, and useful resources to explore next.
      </p>

      {isEmpty(resources) ? (
        <div className="mt-10">
          <EmptyState title="Resources coming soon" body="Useful links and learning resources will be collected here." />
        </div>
      ) : (
        groups.map((group) => {
          const items = resources.filter((r) => r.category === group);
          const id = `resources-${group.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <section key={group} aria-labelledby={id} className="mt-12">
              <SectionHeader id={id} title={group} count={items.length} />
              <ul className="m-0 list-none border-b border-border p-0">
                {items.map((item) => (
                  <ResourceRow key={item.name} item={item} />
                ))}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}
