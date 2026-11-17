import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./sidebar";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

afterEach(() => {
  cleanup();
  pathname.value = "/";
});

describe("Sidebar", () => {
  it("renders nav labels in order", () => {
    render(<Sidebar onSearch={() => {}} />);
    const nav = screen.getAllByRole("navigation")[0];
    const labels = within(nav).getAllByRole("link").map((a) => a.getAttribute("data-label"));
    expect(labels).toEqual(["Home", "Projects", "Stack", "Certifications", "About me", "Blog", "Gear", "Links", "Resources"]);
  });

  it("shows counts for projects and certifications", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(within(screen.getByRole("link", { name: /^Projects/ })).getByText("7")).toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /^Certifications/ })).getByText("14")).toBeInTheDocument();
  });

  it("marks the current section for nested paths", () => {
    pathname.value = "/projects/omnave";
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.getByRole("link", { name: /^Projects/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /^Home/ })).not.toHaveAttribute("aria-current");
  });

  it("tags empty Gear and Resources as soon", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(within(screen.getByRole("link", { name: /^Gear/ })).getByText("soon")).toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /^Resources/ })).getByText("soon")).toBeInTheDocument();
  });

  it("calls onSearch and shows the contact link", () => {
    const onSearch = vi.fn();
    render(<Sidebar onSearch={onSearch} />);
    screen.getByRole("button", { name: /search/i }).click();
    expect(onSearch).toHaveBeenCalled();
    expect(screen.getByRole("link", { name: /contact me/i }).getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.getByText("Available for internships")).toBeInTheDocument();
  });
});
