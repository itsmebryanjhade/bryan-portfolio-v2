import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/app/theme-toggle";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  document.body.innerHTML = "";
  delete document.documentElement.dataset.theme;
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("ThemeToggle", () => {
  it("hydrates without mismatch for stored-light users, then toggles", async () => {
    const html = renderToString(<ThemeToggle />); // server: dark
    document.documentElement.dataset.theme = "light"; // no-flash script result
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      hydrateRoot(container, <ThemeToggle />);
    });

    expect(errors).not.toHaveBeenCalled();
    const button = container.querySelector("button")!;
    expect(button.getAttribute("aria-label")).toBe("Switch to dark theme");

    await act(async () => {
      button.click();
    });
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(button.getAttribute("aria-label")).toBe("Switch to light theme");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
