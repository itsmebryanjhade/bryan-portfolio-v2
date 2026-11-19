import type { Metadata } from "next";
import { stack } from "@/content/stack";
import type { StackItem } from "@/content/types";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";
import { ToolTile } from "@/components/ui/tool-tile";

export const metadata: Metadata = {
  title: "Stack",
  description: "Languages, frameworks and tools Bryan Jhade builds with.",
};

const categories: StackItem["category"][] = ["Languages", "Frontend", "Backend & data", "AI", "Tools"];

const slug = (s: string) => `stack-${s.replace(/\W+/g, "-").toLowerCase()}`;

export default function StackPage() {
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">
        What I build with
      </h1>
      <p className="mt-3 text-sm text-muted">
        What I picked up from my courses, certificates and own projects. Hover a tool to see where it came from.
      </p>
      <p className="mt-5 flex items-center gap-2 text-xs text-faint">
        <span aria-hidden="true" className="inline-block h-3.5 w-6 rounded-[5px] border border-dashed border-border-hover" />
        Learning now in Meta&apos;s full-stack courses
      </p>

      {categories.map((cat) => {
        const items = stack.filter((s) => s.category === cat);
        return (
          <section key={cat} aria-labelledby={slug(cat)} className="mt-12">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 id={slug(cat)} className="text-xs text-faint">
                {cat}
              </h2>
              <span className="font-mono text-[11px] text-faint">{String(items.length).padStart(2, "0")}</span>
            </div>
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
              {items.map((s) => (
                <ToolTile key={s.name} item={s} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
