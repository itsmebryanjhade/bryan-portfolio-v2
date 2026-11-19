import type { Profile } from "@/content/types";

/** Timeline: a thin rail with a small dot per step, the year on the right. */
export function Journey({ items }: { items: Profile["journey"] }) {
  return (
    <ol className="relative m-0 list-none p-0 pl-6 before:absolute before:bottom-3 before:left-[3px] before:top-3 before:w-px before:bg-border before:content-['']">
      {items.map((j) => (
        <li key={`${j.year}-${j.title}`} className="relative pb-7 last:pb-0">
          <span aria-hidden="true" className="absolute -left-6 top-[7px] h-[7px] w-[7px] rounded-full border border-border-hover bg-bg" />
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[15px] text-fg">{j.title}</span>
            <span className="flex-none font-mono text-xs text-faint">{j.year}</span>
          </div>
          <p className="mt-1.5 text-sm leading-6 text-muted">{j.detail}</p>
        </li>
      ))}
    </ol>
  );
}
