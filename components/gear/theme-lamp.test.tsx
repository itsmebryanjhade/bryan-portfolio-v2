import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import { ThemeLamp } from "./theme-lamp";

beforeEach(() => {
  document.documentElement.dataset.theme = "dark";
});
afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
});

it("is on in dark theme, and clicking it switches the whole site to light", () => {
  render(<ThemeLamp off="/lamp-off.webp" alt="Lamp" />);
  const lamp = screen.getByRole("button", { name: /turn the lamp off/i });
  expect(lamp).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(lamp);
  expect(document.documentElement.dataset.theme).toBe("light");
});

it("follows a theme change from elsewhere, like the sidebar toggle", async () => {
  render(<ThemeLamp off="/lamp-off.webp" alt="Lamp" />);
  await act(async () => {
    document.documentElement.dataset.theme = "light";
  });
  expect(screen.getByRole("button", { name: /turn the lamp on/i })).toHaveAttribute("aria-pressed", "false");
});
