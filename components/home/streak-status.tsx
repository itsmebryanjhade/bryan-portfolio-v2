import { Flame } from "lucide-react";
import type { Streaks } from "@/lib/github";
import { ManilaStatus } from "./manila-status";

const GITHUB = "https://github.com/itsmebryanjhade";

export type Activity = Streaks & { total: number };

/**
 * The hero's status pill: Bryan's GitHub coding streak and yearly contributions, linking to the
 * profile. Shows the current streak while there is one (2+ days in a row), otherwise the best
 * streak this year, so it never reads "0-day streak". Falls back to the Manila clock without data.
 */
export function StreakStatus({ activity }: { activity: Activity | null }) {
  if (!activity) return <ManilaStatus />;
  const live = activity.current >= 2;
  const days = live ? activity.current : activity.longest;
  const streak = live ? `${days}-day streak` : `best streak ${days} days`;
  const total = `${activity.total.toLocaleString("en-US")} this year`;
  return (
    <a
      href={GITHUB}
      target="_blank"
      rel="noreferrer"
      aria-label={`GitHub: ${streak}, ${activity.total} contributions this year (opens in a new tab)`}
      className="inline-flex min-h-4 items-center gap-1.5 whitespace-nowrap text-[11px] text-muted transition-colors duration-150 hover:text-fg"
    >
      <Flame size={12} strokeWidth={1.8} aria-hidden="true" className={live ? "text-fg" : "text-faint"} />
      <span className="tabular-nums">{streak}</span>
      <span className="tabular-nums text-faint">· {total}</span>
    </a>
  );
}
