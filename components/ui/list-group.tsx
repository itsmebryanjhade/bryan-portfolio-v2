import type { ListItem } from "@/content/types";

function Item({ item }: { item: ListItem }) {
  const external = item.href?.startsWith("http");
  const inner = (
    <>
      <span className="text-[14px] text-fg">{item.name}</span>
      {item.note && <span className="text-[13px] text-muted">{item.note}</span>}
      {external && (
        <>
          <span aria-hidden="true" className="text-muted"> ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </>
  );
  const cls =
    "flex flex-wrap items-baseline gap-x-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-hover";
  if (!item.href) return <div className={cls}>{inner}</div>;
  return external ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
  ) : (
    <a href={item.href} className={cls}>{inner}</a>
  );
}

export function ListGroup({ items }: { items: ListItem[] }) {
  const categories = [...new Set(items.map((i) => i.category))];
  return (
    <div className="grid gap-4">
      {categories.map((cat) => (
        <section key={cat} aria-label={cat} className="rounded-card border border-border bg-card p-5">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{cat}</h3>
          <ul className="mt-3 list-none p-0">
            {items.filter((i) => i.category === cat).map((i) => (
              <li key={i.name}><Item item={i} /></li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
