import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useShortcut } from "./use-shortcut";

function setPlatform(platform: string, userAgent: string) {
  vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);
  vi.spyOn(navigator, "userAgent", "get").mockReturnValue(userAgent);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("useShortcut", () => {
  it("fires on Ctrl K and prevents the browser default", () => {
    const onOpen = vi.fn();
    renderHook(() => useShortcut(onOpen));
    const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, cancelable: true, bubbles: true });
    act(() => {
      document.dispatchEvent(e);
    });
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(e.defaultPrevented).toBe(true);
  });

  it("fires on Cmd K", () => {
    const onOpen = vi.fn();
    renderHook(() => useShortcut(onOpen));
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
    });
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("ignores events from inputs, textareas and contenteditable", () => {
    const onOpen = vi.fn();
    renderHook(() => useShortcut(onOpen));
    const input = document.createElement("input");
    const ta = document.createElement("textarea");
    const ce = document.createElement("div");
    ce.setAttribute("contenteditable", "true");
    document.body.append(input, ta, ce);
    for (const el of [input, ta, ce]) {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
    }
    expect(onOpen).not.toHaveBeenCalled();
  });

  it("labels Ctrl K on Windows", () => {
    setPlatform("Win32", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    const { result } = renderHook(() => useShortcut(() => {}));
    expect(result.current.label).toBe("Ctrl K");
  });

  it("labels ⌘K on Mac", () => {
    setPlatform("MacIntel", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    const { result } = renderHook(() => useShortcut(() => {}));
    expect(result.current.label).toBe("⌘K");
  });
});
