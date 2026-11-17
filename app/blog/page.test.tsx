import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BlogPage from "./page";

afterEach(cleanup);

describe("blog page with no posts", () => {
  it("shows the empty state and no article list", () => {
    render(<BlogPage />);
    expect(screen.getByText("First posts coming soon")).toBeTruthy();
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
