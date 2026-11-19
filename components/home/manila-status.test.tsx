import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ManilaStatus } from "./manila-status";

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("renders nothing on the server", () => {
  expect(renderToString(<ManilaStatus />)).not.toMatch(/Manila/);
});

it("shows a sun by day and a moon at night", () => {
  vi.setSystemTime(new Date("2026-11-18T02:00:00Z")); // 10:00 AM Manila
  render(<ManilaStatus />);
  expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  expect(screen.getByText("(daytime)")).toBeInTheDocument();
  act(() => {
    vi.setSystemTime(new Date("2026-11-18T13:00:00Z")); // 9:00 PM Manila
    vi.advanceTimersByTime(60_000);
  });
  expect(screen.getByText("(night-time)")).toBeInTheDocument();
});
