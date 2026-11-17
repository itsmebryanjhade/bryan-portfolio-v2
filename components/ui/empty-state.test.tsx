import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EmptyState } from "./empty-state";

afterEach(cleanup);

describe("EmptyState", () => {
  it("renders its title as a heading with the body", () => {
    render(<EmptyState title="First posts coming soon" body="Nothing yet." />);
    expect(screen.getByRole("heading", { name: "First posts coming soon" })).toBeTruthy();
    expect(screen.getByText("Nothing yet.")).toBeTruthy();
  });
});
