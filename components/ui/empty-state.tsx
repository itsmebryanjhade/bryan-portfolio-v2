type Props = { title: string; body: string };

export function EmptyState({ title, body }: Props) {
  return (
    <div className="rounded-card border border-dashed border-border bg-card p-8 text-center">
      <h2 className="text-[15px] font-medium text-fg">{title}</h2>
      <p className="mt-2 text-[13px] text-muted">{body}</p>
    </div>
  );
}
