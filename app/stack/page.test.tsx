import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import StackPage from "./page";

afterEach(cleanup);

describe("stack page", () => {
  it("has one h1 and a counted section per category", () => {
    render(<StackPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(["Languages", "Frontend", "Backend & data", "AI", "Tools"]);
    const frontend = screen.getByRole("region", { name: "Frontend" });
    expect(within(frontend).getByText("04")).toBeInTheDocument();
    expect(within(frontend).getByText("Next.js")).toBeInTheDocument();
  });

  it("marks tools still being learned and says where each came from", () => {
    render(<StackPage />);
    const django = screen.getByText("Django", { exact: true }).closest("li")!;
    expect(django).toHaveAttribute("data-learning", "true");
    expect(django).toHaveTextContent("(learning now)");
    const flask = screen.getByText("Flask").closest("li")!;
    expect(flask).not.toHaveAttribute("data-learning");
    expect(flask).toHaveAttribute("title", "Self-taught");
  });
});
