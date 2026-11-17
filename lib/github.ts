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
    if (typeof total !== "number" || !Array.isArray(list)) return null;
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
