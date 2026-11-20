import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { LIT_MS, TouchMotion } from "./touch-motion";

const setHover = (none: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({ matches: q === "(hover: none)" ? none : false, addEventListener() {}, removeEventListener() {} }));

function page() {
  const host = document.createElement("div");
  host.innerHTML = `
    <div class="group" id="plain"><img class="grayscale group-hover:grayscale-0" alt="" /></div>
    <a class="group" id="link" href="#"><img class="grayscale group-hover:grayscale-0" alt="" /></a>
    <p id="text">text</p>`;
  document.body.append(host);
  const $ = (id: string) => document.getElementById(id)!;
  return { plain: $("plain"), link: $("link"), text: $("text") };
}

/** A finger tap: down and up in the same spot. iPhone Safari sends no click for plain elements. */
function tap(el: Element, move = 0) {
  fireEvent.pointerDown(el, { pointerType: "touch", clientX: 50, clientY: 50 });
  fireEvent.pointerUp(el, { pointerType: "touch", clientX: 50 + move, clientY: 50 });
}
const lit = (el: Element) => el.hasAttribute("data-lit");

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("TouchMotion (touch screens)", () => {
  it("keeps photos black and white until tapped", () => {
    setHover(true);
    const { plain, link } = page();
    render(<TouchMotion />);
    expect(lit(plain) || lit(link)).toBe(false);
  });

  it("shows a tapped photo in colour for 5 seconds, then fades it back", () => {
    setHover(true);
    const { plain } = page();
    render(<TouchMotion />);
    tap(plain.querySelector("img")!);
    expect(lit(plain)).toBe(true);
    act(() => vi.advanceTimersByTime(LIT_MS - 1));
    expect(lit(plain)).toBe(true);
    act(() => vi.advanceTimersByTime(1));
    expect(lit(plain)).toBe(false);
    expect(LIT_MS).toBe(5000);
  });

  it("a second tap restarts the 5 seconds", () => {
    setHover(true);
    const { plain } = page();
    render(<TouchMotion />);
    tap(plain);
    act(() => vi.advanceTimersByTime(4000));
    tap(plain);
    act(() => vi.advanceTimersByTime(4000));
    expect(lit(plain)).toBe(true);
  });

  it("a scroll (the finger moves) doesn't colour a photo", () => {
    setHover(true);
    const { plain } = page();
    render(<TouchMotion />);
    tap(plain, 40);
    expect(lit(plain)).toBe(false);
  });

  it("photos inside links colour on the click, never under the finger (so Safari can't drop the tap)", () => {
    setHover(true);
    const { link } = page();
    render(<TouchMotion />);
    tap(link.querySelector("img")!);
    expect(lit(link)).toBe(false);
    fireEvent.click(link.querySelector("img")!);
    expect(lit(link)).toBe(true);
  });

  it("ignores taps outside photos, and does nothing with a mouse", () => {
    setHover(true);
    const a = page();
    render(<TouchMotion />);
    tap(a.text);
    expect(lit(a.plain)).toBe(false);
    cleanup();
    document.body.innerHTML = "";
    setHover(false);
    const b = page();
    render(<TouchMotion />);
    tap(b.plain);
    fireEvent.click(b.link);
    expect(lit(b.plain) || lit(b.link)).toBe(false);
  });
});
