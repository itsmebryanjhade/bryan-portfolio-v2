type Props = {
  id?: string;
  title: string;
  /** Optional count shown on the right, e.g. 3 -> "03". */
  count?: number;
};

/** Quiet section label: small grey text on the left, an optional count on the right. */
export function SectionHeader({ id, title, count }: Props) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 id={id} className="text-sm font-normal text-faint">
        {title}
      </h2>
      {count !== undefined && <span className="font-mono text-xs text-faint">{String(count).padStart(2, "0")}</span>}
    </div>
  );
}
