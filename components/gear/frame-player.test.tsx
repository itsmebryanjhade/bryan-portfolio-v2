import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import { FramePlayer } from "./frame-player";

const frames = ["/f/0.webp", "/f/1.webp", "/f/2.webp"];

beforeEach(() => vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "setTimeout", "performance"] }));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("plays smoothly forward on hover and back to the first frame on leave", () => {
  render(<FramePlayer frames={frames} alt="Laptop" />);
  const player = screen.getByRole("img", { name: "Laptop" }).parentElement!;
  expect(player).toHaveAttribute("data-frame", "0");
  fireEvent.pointerEnter(player, { pointerType: "mouse" });
  act(() => vi.advanceTimersByTime(2000));
  expect(player).toHaveAttribute("data-frame", "2");
  fireEvent.pointerLeave(player, { pointerType: "mouse" });
  act(() => vi.advanceTimersByTime(2000));
  expect(player).toHaveAttribute("data-frame", "0");
});

it("opens and closes with a tap on touch screens", () => {
  render(<FramePlayer frames={frames} alt="Laptop" />);
  const player = screen.getByRole("img", { name: "Laptop" }).parentElement!;
  fireEvent.pointerEnter(player, { pointerType: "touch" });
  fireEvent.pointerUp(player, { pointerType: "touch" });
  act(() => vi.advanceTimersByTime(2000));
  expect(player).toHaveAttribute("data-frame", "2");
  fireEvent.pointerUp(player, { pointerType: "touch" });
  act(() => vi.advanceTimersByTime(2000));
  expect(player).toHaveAttribute("data-frame", "0");
});
