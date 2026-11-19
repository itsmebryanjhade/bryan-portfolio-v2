import { fetchContributions } from "@/lib/github";

const GITHUB = "https://github.com/itsmebryanjhade";
// Level 0 uses the visible `hover` token; levels 1-4 scale `fg` opacity.
const LEVEL_STYLE = ["bg-hover", "bg-fg/20", "bg-fg/40", "bg-fg/65", "bg-fg/95"];
const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export async function GithubActivity() {
  const data = await fetchContributions();

  if (!data) {
    return (
      <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-block rounded-card border border-border bg-card px-4 py-3 text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:text-fg">
        View activity on GitHub<span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  // Rows are weekdays (Sunday first); pad so the first day lands on its weekday row.
  const first = data.days[0] ? new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const weeks = Math.ceil((first + data.days.length) / 7);
  const cols = { gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` };

  const total = `${data.total.toLocaleString("en-US")} ${data.total === 1 ? "contribution" : "contributions"} in the last year`;

  return (
    <div className="min-w-0 rounded-card border border-border bg-card p-4">
        <p className="sr-only">{total}</p>

        <div aria-hidden="true">
          <div data-testid="contrib-grid" className="grid grid-flow-col grid-rows-7 gap-[3px]" style={cols}>
            {Array.from({ length: first }, (_, i) => (
              <span key={`pad-${i}`} className="aspect-square" />
            ))}
            {data.days.map((d) => (
              <span
                key={d.date}
                data-level={d.level}
                title={DAY.format(new Date(`${d.date}T00:00:00Z`))}
                className={`aspect-square rounded-[2px] ${LEVEL_STYLE[d.level]}`}
              />
            ))}
          </div>
      </div>
    </div>
  );
}
