import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GithubActivity } from "./github-activity";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("GithubActivity", () => {
  it("renders only the fallback link when data is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const { container } = render(await GithubActivity());
    const link = screen.getByRole("link", { name: /View activity on GitHub/ });
    expect(link).toHaveAttribute("href", "https://github.com/itsmebryanjhade");
    expect(link).toHaveAttribute("rel", "noreferrer");
    expect(container.querySelector("[data-testid='contrib-grid']")).toBeNull();
  });

  it("renders grid and hidden summary with data", async () => {
    const body = { total: { lastYear: 12 }, contributions: [
      { date: "2025-11-16", count: 0, level: 0 },
      { date: "2025-11-17", count: 5, level: 3 },
    ] };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 })));
    const { container } = render(await GithubActivity());
    expect(screen.getByText("12 contributions in the last year")).toHaveClass("sr-only");
    const grid = container.querySelector("[data-testid='contrib-grid']");
    expect(grid?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(grid?.querySelectorAll("[data-level]")).toHaveLength(2);
  });

  it("draws the year as one light SVG: one shape per level, not one element per day", async () => {
    const body = { total: { lastYear: 9 }, contributions: [
      { date: "2025-11-16", count: 0, level: 0 },
      { date: "2025-11-17", count: 5, level: 3 },
      { date: "2025-11-18", count: 4, level: 3 },
    ] };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 })));
    const { container } = render(await GithubActivity());
    const grid = container.querySelector("[data-testid='contrib-grid']");
    expect(grid?.tagName.toLowerCase()).toBe("svg");
    const level3 = grid?.querySelectorAll("path[data-level='3']");
    expect(level3).toHaveLength(1);
    // two days at level 3, so two cells in that one shape
    expect(level3?.[0].getAttribute("d")?.match(/M/g)).toHaveLength(2);
  });
});
