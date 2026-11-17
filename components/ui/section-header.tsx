import Link from "next/link";

type Props = { id?: string; index: string; title: string; href?: string; linkLabel?: string; external?: boolean };

export function SectionHeader({ id, index, title, href, linkLabel, external }: Props) {
  const label = `${linkLabel ?? ""} ${external ? "↗" : "→"}`.trim();
  const cls = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:text-fg";
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        {index} — {title}
      </h2>
      {href &&
        (external ? (
          <a href={href} target="_blank" rel="noreferrer" className={cls}>{label}</a>
        ) : (
          <Link href={href} className={cls}>{label}</Link>
        ))}
    </div>
  );
}
