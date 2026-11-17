import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import StackPage from "./page";

afterEach(cleanup);

describe("stack page", () => {
  it("nests category headings (h3) under the section header (h2)", () => {
    render(<StackPage />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 3, name: "Frontend" })).toBeInTheDocument();
  });
});
