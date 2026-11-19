export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; days: ContributionDay[] };

export async function fetchContributions(user = "itsmebryanjhade"): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const total = data?.total?.lastYear;
    const list = data?.contributions;
    if (!Number.isFinite(total) || !Array.isArray(list) || list.length === 0) return null;
    const days: ContributionDay[] = [];
    for (const d of list) {
      if (typeof d?.date !== "string" || ![0, 1, 2, 3, 4].includes(d?.level)) return null;
      days.push({ date: d.date, level: d.level });
    }
    return { total, days };
  } catch {
    return null;
  }
}

export type Streaks = { current: number; longest: number };

/**
 * Days in a row with at least one contribution. `current` ends at the last day in the data, or the
 * day before it (so a streak still counts on a day you haven't pushed yet); `longest` is the best run.
 */
export function streaks(days: ContributionDay[]): Streaks {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.level > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  let end = days.length - 1;
  if (end >= 0 && days[end].level === 0) end--;
  let current = 0;
  while (end >= 0 && days[end].level > 0) {
    current++;
    end--;
  }
  return { current, longest };
}
