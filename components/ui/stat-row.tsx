export function StatRow({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-3 overflow-hidden rounded-card border border-border bg-card">
      {stats.map((s, i) => (
        <div key={s.label} className={`flex flex-col-reverse justify-end px-4 py-4 sm:px-5 ${i > 0 ? "border-l border-border" : ""}`}>
          <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint sm:text-[11px]">{s.label}</dt>
          <dd className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
