import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Hero } from "./hero";

afterEach(cleanup);

describe("Hero", () => {
  it("renders the name as h1", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: "Bryan Jhade B. Ebuan" })).toBeInTheDocument();
  });

  it("highlights the four intro phrases", () => {
    render(<Hero />);
    for (const t of ["AI software engineer", "full-stack", "BS IT", "AI tools"]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });

  it("states the role and links to the about page", () => {
    render(<Hero />);
    expect(screen.getByText("Aspiring AI Software Engineer")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /more about me/i })).toHaveAttribute("href", "/about");
    expect(screen.queryByText(/HUMSS/)).toBeNull();
  });
});
