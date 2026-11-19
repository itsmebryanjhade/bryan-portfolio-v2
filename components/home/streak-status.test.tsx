import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { streaks, type ContributionDay } from "@/lib/github";
import { StreakStatus } from "./streak-status";

afterEach(cleanup);

const days = (levels: number[]): ContributionDay[] =>
  levels.map((level, i) => ({ date: `2026-11-${String(i + 1).padStart(2, "0")}`, level: level as ContributionDay["level"] }));

describe("streaks", () => {
  it("counts the current run, even before today's first push", () => {
    expect(streaks(days([1, 0, 1, 1, 1]))).toEqual({ current: 3, longest: 3 });
    expect(streaks(days([1, 1, 1, 1, 0]))).toEqual({ current: 4, longest: 4 });
  });
  it("has no current streak after a gap, but keeps the best one", () => {
    expect(streaks(days([1, 1, 1, 0, 0]))).toEqual({ current: 0, longest: 3 });
  });
});

describe("StreakStatus", () => {
  it("shows the live streak and links the GitHub profile", () => {
    render(<StreakStatus activity={{ current: 12, longest: 20, total: 406 }} />);
    const link = screen.getByRole("link", { name: /12-day streak, 406 contributions/i });
    expect(link).toHaveAttribute("href", "https://github.com/itsmebryanjhade");
  });
  it("shows the best streak instead of a zero streak", () => {
    render(<StreakStatus activity={{ current: 0, longest: 9, total: 406 }} />);
    expect(screen.getByText("best streak 9 days")).toBeInTheDocument();
    expect(screen.queryByText(/0-day/)).toBeNull();
  });
  it("falls back to the Manila clock without data", () => {
    render(<StreakStatus activity={null} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
