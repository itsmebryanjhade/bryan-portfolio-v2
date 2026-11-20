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

  it("has a 44px menu button and no search in the bar (search is in the menu)", () => {
    render(<MobileBar />);
    const menu = screen.getByRole("button", { name: /open menu/i });
    expect(menu.className).toMatch(/h-11/);
    expect(menu.className).toMatch(/w-11/);
    expect(within(screen.getByRole("banner")).queryByRole("button", { name: /^search$/i })).toBeNull();
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

  it("opens the side panel from the left menu button and closes from inside it", () => {
    render(<MobileBar />);
    const menu = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: /close menu/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("shows the pixel face (home) in the bar, not the name", () => {
    render(<MobileBar />);
    const bar = screen.getByRole("banner");
    expect(within(bar).getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(within(bar).queryByText("Jhade")).toBeNull();
  });

  it("marks the current page in the menu sheet", () => {
    pathname.value = "/projects";
    render(<MobileBar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(within(screen.getByRole("dialog")).getByRole("link", { name: /projects/i })).toHaveAttribute("aria-current", "page");
  });

  it("scrolls the menu only up and down: the watermark poking past its edge can't drag it sideways", () => {
    render(<MobileBar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const panel = screen.getByRole("dialog");
    expect(panel.className).toMatch(/\boverflow-y-auto\b/);
    expect(panel.className).toMatch(/\boverflow-x-hidden\b/);
  });

  it("stays pinned to the top while the page scrolls", () => {
    render(<MobileBar />);
    expect(screen.getByRole("banner").className).toMatch(/sticky top-0/);
  });

  it("keeps the panel briefly to slide it out after closing", () => {
    vi.useFakeTimers();
    render(<MobileBar />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByLabelText("Site menu").className).toMatch(/sheet-slide-out/);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByLabelText("Site menu")).toBeNull();
    vi.useRealTimers();
  });
});
