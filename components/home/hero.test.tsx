import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Hero } from "./hero";

afterEach(cleanup);

describe("Hero", () => {
  it("renders the name as h1", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: "Bryan Jhade" })).toBeInTheDocument();
  });

  it("renders the four intro pills", () => {
    render(<Hero />);
    for (const t of ["BS IT", "web apps", "AI tools", "election system"]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });

  it("links socials", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/itsmebryanjhade");
  });
});
