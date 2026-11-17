import Link from "next/link";

type Props = { ariaLabel?: string; id?: string; index: string; title: string; href?: string; linkLabel?: string; external?: boolean };

export function SectionHeader({ ariaLabel, id, index, title, href, linkLabel, external }: Props) {
  const label = (
    <>
      {linkLabel}
      <span aria-hidden="true"> {external ? "↗" : "→"}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const cls = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:text-fg";
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        {index} — {title}
      </h2>
      {href &&
        (external ? (
          <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel} className={cls}>{label}</a>
        ) : (
          <Link href={href} aria-label={ariaLabel} className={cls}>{label}</Link>
        ))}
    </div>
  );
}
