import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { stack } from "@/content/stack";
import type { StackItem } from "@/content/types";

export const metadata: Metadata = {
  title: "Stack",
  description: "Languages, frameworks and tools Bryan Jhade builds with.",
};

const categories: StackItem["category"][] = ["Frontend", "Backend & data", "AI", "Tools"];

export default function StackPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Stack</h1>
      <SectionHeader index="01" title="Stack" />
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <section key={cat} aria-labelledby={`stack-${cat.replace(/\W+/g, "-").toLowerCase()}`} className="rounded-card border border-border bg-card p-5">
            <h3 id={`stack-${cat.replace(/\W+/g, "-").toLowerCase()}`} className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{cat}</h3>
            <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
              {stack.filter((s) => s.category === cat).map((s) => (
                <li key={s.name} className="rounded-pill border border-border bg-panel px-2.5 py-1 text-[13px] text-fg">
                  {s.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
