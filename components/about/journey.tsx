import type { Profile } from "@/content/types";

export function Journey({ items }: { items: Profile["journey"] }) {
  return (
    <ol className="list-none space-y-5 border-l border-border p-0 pl-5">
      {items.map((j) => (
        <li key={`${j.year}-${j.title}`}>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{j.year}</div>
          <div className="mt-1 text-[15px] font-medium text-fg">{j.title}</div>
          <p className="mt-1 text-[14px] leading-relaxed text-muted">{j.detail}</p>
        </li>
      ))}
    </ol>
  );
}
