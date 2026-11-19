/** A labelled section: the label sits in a narrow left column on wider screens, like a spec sheet. */
export function Part({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14 grid gap-4 sm:grid-cols-[130px_1fr] sm:gap-8">
      <h2 id={id} className="text-sm text-faint sm:pt-1">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

