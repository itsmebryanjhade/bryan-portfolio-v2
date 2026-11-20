import { fetchContributions } from "@/lib/github";

const GITHUB = "https://github.com/itsmebryanjhade";
// Level 0 uses the visible `hover` token; levels 1-4 scale `fg` opacity.
const LEVEL_FILL = ["fill-hover", "fill-fg/20", "fill-fg/40", "fill-fg/65", "fill-fg/95"];

// One day: a 7-unit rounded square, 3 units apart (about the old 3px gap on a laptop-width card).
const SIZE = 7;
const GAP = 3;
const STEP = SIZE + GAP;
const R = 1.6;
const SIDE = SIZE - 2 * R;
function cell(x: number, y: number) {
  return `M${x + R} ${y}h${SIDE}a${R} ${R} 0 0 1 ${R} ${R}v${SIDE}a${R} ${R} 0 0 1 -${R} ${R}h-${SIDE}a${R} ${R} 0 0 1 -${R} -${R}v-${SIDE}a${R} ${R} 0 0 1 ${R} -${R}z`;
}

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
  // The year is drawn as one SVG with a single shape per level (each day a small rounded square in it),
  // not 365 boxes: far less for a phone to build and lay out when the home page opens.
  const shapes: string[] = ["", "", "", "", ""];
  data.days.forEach((d, i) => {
    const slot = first + i;
    shapes[d.level] += cell(Math.floor(slot / 7) * STEP, (slot % 7) * STEP);
  });
  const width = weeks * STEP - GAP;
  const height = 7 * STEP - GAP;

  const total = `${data.total.toLocaleString("en-US")} ${data.total === 1 ? "contribution" : "contributions"} in the last year`;

  return (
    <div className="min-w-0 rounded-card border border-border bg-card p-4">
        <p className="sr-only">{total}</p>

        <div aria-hidden="true">
          <svg data-testid="contrib-grid" viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full">
            {shapes.map((d, level) =>
              d ? <path key={level} data-level={level} d={d} className={LEVEL_FILL[level]} /> : null,
            )}
          </svg>
      </div>
    </div>
  );
}
