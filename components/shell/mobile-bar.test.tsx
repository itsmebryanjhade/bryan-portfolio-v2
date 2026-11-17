import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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

  it("wraps Tab and Shift+Tab focus inside the dialog", () => {
    render(<MobileBar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = screen.getByRole("dialog");
    const els = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    els[els.length - 1].focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(document.activeElement).toBe(els[0]);
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(els[els.length - 1]);
  });

  it("locks body scroll while open and restores it on close", () => {
    document.body.style.overflow = "auto";
    render(<MobileBar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(document.body.style.overflow).toBe("auto");
  });

  it("has a 44px search button that opens the palette", () => {
    render(<MobileBar />);
    const handler = vi.fn();
    window.addEventListener("open-palette", handler);
    const search = screen.getByRole("button", { name: /^search$/i });
    expect(search.className).toMatch(/h-11/);
    expect(search.className).toMatch(/w-11/);
    fireEvent.click(search);
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("open-palette", handler);
  });

  it("drawer Search focuses the menu button before opening the palette", () => {
    render(<MobileBar />);
    const menu = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menu);
    let focusedAtOpen: Element | null = null;
    const handler = () => { focusedAtOpen = document.activeElement; };
    window.addEventListener("open-palette", handler);
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: /search/i }));
    window.removeEventListener("open-palette", handler);
    expect(focusedAtOpen).toBe(menu);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
