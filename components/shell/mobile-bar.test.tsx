import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MobileBar } from "./mobile-bar";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

afterEach(() => {
  cleanup();
  pathname.value = "/";
});

describe("MobileBar", () => {
  it("opens a modal dialog from the menu button", () => {
    render(<MobileBar />);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("closes on Escape and returns focus to the menu button", () => {
    render(<MobileBar />);
    const menu = screen.getByRole("button", { name: /open menu/i });
    menu.focus();
    fireEvent.click(menu);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(menu);
  });

  it("closes when the route changes", () => {
    const { rerender } = render(<MobileBar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => {
      pathname.value = "/projects";
    });
    rerender(<MobileBar />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
