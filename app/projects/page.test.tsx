import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import ProjectsPage from "./page";

afterEach(cleanup);

it("shows the three standouts as gradient cards, then lists the rest", () => {
  render(<ProjectsPage />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  const standouts = screen.getByRole("region", { name: "Standouts" });
  expect(within(standouts).getByText("03")).toBeInTheDocument();
  for (const name of ["Omnave", "PondoPath", "OSC Halalan 2026"]) {
    expect(within(standouts).getByRole("heading", { name })).toBeInTheDocument();
  }
  const solo = screen.getByRole("region", { name: "Solo builds" });
  expect(within(solo).queryByText("PondoPath")).toBeNull();
  // Throwback PH was a group project, but Bryan built the whole system, so it's a solo build.
  for (const name of [/kisap/i, /framori/i, /throwback ph/i, /wholeturn/i]) {
    expect(within(solo).getByRole("link", { name })).toBeInTheDocument();
  }
  expect(within(solo).getAllByText("School project")).toHaveLength(2);
  expect(screen.queryByRole("region", { name: "Team builds" })).toBeNull();
});

it("opens every project on its own page first, not in a new tab", () => {
  render(<ProjectsPage />);
  const kisap = screen.getByRole("link", { name: /kisap/i });
  expect(kisap).toHaveAttribute("href", "/projects/kisap");
  expect(kisap).not.toHaveAttribute("target");
});
