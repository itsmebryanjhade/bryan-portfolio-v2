import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ResourcesPage from "./page";

afterEach(cleanup);

describe("resources page", () => {
  it("groups resources with a reason under each name", () => {
    render(<ResourcesPage />);
    expect(screen.getByRole("heading", { level: 1, name: "My Learning Shelf" })).toBeInTheDocument();
    for (const g of ["Courses", "Watch", "Read", "Skills & repos"]) {
      expect(screen.getByRole("region", { name: g })).toBeInTheDocument();
    }
    const google = within(screen.getByRole("region", { name: "Courses" })).getByRole("link", { name: /google ai/i });
    expect(google).toHaveAttribute("href", "https://www.coursera.org/professional-certificates/google-ai");
    expect(google).toHaveAttribute("target", "_blank");
    expect(screen.queryByText(/cs50/i)).toBeNull();
    expect(within(google).getByText("coursera.org")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /superpowers/i })).toHaveAttribute("href", "https://github.com/obra/superpowers");
    expect(screen.getByText("Used here — agent skills for planning, implementation, debugging and review.")).toBeInTheDocument();
    expect(screen.queryByText("Resources coming soon")).toBeNull();
  });
});
