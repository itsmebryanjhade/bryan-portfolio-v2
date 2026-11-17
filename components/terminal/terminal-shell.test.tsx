import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { profile } from "@/content/profile";
import { TerminalShell } from "./terminal-shell";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  push.mockReset();
});

function openTerminal() {
  act(() => {
    window.dispatchEvent(new Event("open-terminal"));
  });
}

describe("TerminalShell", () => {
  it("opens on the open-terminal event", () => {
    render(<TerminalShell />);
    expect(screen.queryByRole("dialog")).toBeNull();
    openTerminal();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it.each([
    ["work", "/projects"],
    ["omnave", "/projects/omnave"],
    ["about", "/about"],
    ["stack", "/stack"],
    ["credentials", "/certifications"],
  ])("%s pushes %s", async (cmd, href) => {
    const user = userEvent.setup();
    render(<TerminalShell />);
    openTerminal();
    await user.type(screen.getByRole("textbox"), `${cmd}{Enter}`);
    expect(push).toHaveBeenCalledWith(href);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("contact sets location.href to the mailto", async () => {
    const user = userEvent.setup();
    const loc = { href: "" };
    vi.stubGlobal("location", loc);
    render(<TerminalShell />);
    openTerminal();
    await user.type(screen.getByRole("textbox"), "contact{Enter}");
    expect(loc.href).toBe(`mailto:${profile.email}`);
    expect(push).not.toHaveBeenCalled();
  });

  it("Esc closes and returns focus to the opener", async () => {
    render(<button>opener</button>);
    render(<TerminalShell />);
    const opener = screen.getByRole("button", { name: "opener" });
    opener.focus();
    openTerminal();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });
});
