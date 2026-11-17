import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TerminalShell } from "@/components/terminal/terminal-shell";
import { CommandPalette } from "./command-palette";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }), usePathname: () => "/" }));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  push.mockReset();
});

function ctrlK(target: Element | Document = document) {
  fireEvent.keyDown(target, { key: "k", ctrlKey: true });
}

describe("CommandPalette", () => {
  it("opens on Ctrl K", () => {
    render(<CommandPalette />);
    expect(screen.queryByRole("dialog")).toBeNull();
    ctrlK();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(input.getAttribute("aria-controls")!)).toHaveAttribute("role", "listbox");
  });

  it("does not open when Ctrl K is pressed inside an input", () => {
    render(<input aria-label="other" />);
    render(<CommandPalette />);
    const other = screen.getByLabelText("other");
    other.focus();
    ctrlK(other);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens on the open-palette window event", () => {
    render(<CommandPalette />);
    act(() => {
      window.dispatchEvent(new Event("open-palette"));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("filters case-insensitively by label substring", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);
    ctrlK();
    await user.type(screen.getByRole("combobox"), "OMN");
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(1);
    expect(opts[0]).toHaveTextContent("Omnave");
  });

  it("ArrowDown then Enter runs the item", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);
    ctrlK();
    const input = screen.getByRole("combobox");
    await user.type(input, "omn");
    // single result is already active; ArrowDown wraps back onto it
    await user.keyboard("{ArrowDown}{Enter}");
    expect(push).toHaveBeenCalledWith("/projects/omnave");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("ArrowDown moves aria-activedescendant to the second option", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);
    ctrlK();
    const input = screen.getByRole("combobox");
    const opts = screen.getAllByRole("option");
    expect(opts[0]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", opts[1].id);
    expect(opts[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("Esc closes and returns focus to the trigger", () => {
    render(<button>trigger</button>);
    render(<CommandPalette />);
    const trigger = screen.getByRole("button", { name: "trigger" });
    trigger.focus();
    ctrlK(trigger);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("Open terminal dispatches open-terminal", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    window.addEventListener("open-terminal", handler);
    render(<CommandPalette />);
    ctrlK();
    await user.type(screen.getByRole("combobox"), "terminal");
    await user.keyboard("{Enter}");
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("open-terminal", handler);
  });

  it("shows No results outside the listbox", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);
    ctrlK();
    await user.type(screen.getByRole("combobox"), "zzzz");
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("No results");
    expect(screen.getByRole("listbox")).not.toContainElement(status);
  });

  it("resets selection to the first option when the filter changes", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);
    ctrlK();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    await user.type(screen.getByRole("combobox"), "e");
    const opts = screen.getAllByRole("option");
    expect(opts[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-activedescendant", opts[0].id);
  });

  it("returns focus to the original opener after Open terminal and closing the terminal", async () => {
    const user = userEvent.setup();
    render(<button>trigger</button>);
    render(<CommandPalette />);
    render(<TerminalShell />);
    const trigger = screen.getByRole("button", { name: "trigger" });
    trigger.focus();
    ctrlK(trigger);
    await user.type(screen.getByRole("combobox"), "terminal");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog", { name: /portfolio terminal/i })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
