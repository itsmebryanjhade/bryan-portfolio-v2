import { fetchContributions } from "@/lib/github";

const GITHUB = "https://github.com/itsmebryanjhade";
// Level 0 uses the visible `hover` token; levels 1-4 scale `fg` opacity.
const LEVEL_STYLE = ["bg-hover", "bg-fg/20", "bg-fg/40", "bg-fg/65", "bg-fg/95"];

export async function GithubActivity() {
  const data = await fetchContributions();

  if (!data) {
    return (
      <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-block rounded-card border border-border bg-card px-4 py-3 text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:text-fg">
        View activity on GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  // Rows are weekdays (Sunday first); pad so the first day lands on its weekday row.
  const first = data.days[0] ? new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay() : 0;

  return (
    <div className="rounded-card border border-border bg-card p-4">
      <p className="sr-only">{data.total} contributions in the last year</p>
      <div className="overflow-x-auto">
        <div data-testid="contrib-grid" aria-hidden="true" className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
          {Array.from({ length: first }, (_, i) => (
            <span key={`pad-${i}`} className="size-[10px]" />
          ))}
          {data.days.map((d) => (
            <span key={d.date} data-level={d.level} className={`size-[10px] rounded-[2px] ${LEVEL_STYLE[d.level]}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
