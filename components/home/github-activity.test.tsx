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
});
