import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import CertificationsPage from "./page";

afterEach(cleanup);

it("lists 5 certificates that open in an in-page viewer, with no PDF links", () => {
  render(<CertificationsPage />);
  expect(screen.queryAllByRole("link").filter((a) => a.getAttribute("href")?.endsWith(".pdf"))).toHaveLength(0);
  const buttons = screen.getAllByRole("button", { name: /^view /i });
  expect(buttons).toHaveLength(5);
  fireEvent.click(buttons[0]);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it("standalone badge grid has 8 items", () => {
  render(<CertificationsPage />);
  const grid = screen.getByRole("list", { name: "Badges" });
  expect(within(grid).getAllByRole("listitem")).toHaveLength(8);
});

it("groups certificates by topic with one h1", () => {
  render(<CertificationsPage />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
    "AI",
    "Computer science",
    "Game development",
    "Google AI course badges",
  ]);
  const ai = screen.getByRole("region", { name: "AI" });
  expect(within(ai).getByText("03")).toBeInTheDocument();
  expect(within(ai).getAllByText(/Verified badge/)).toHaveLength(2);
});
