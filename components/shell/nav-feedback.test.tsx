import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const pathname = { value: "/blog" };
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

import { NavFeedback } from "./nav-feedback";

const leaving = () => document.documentElement.hasAttribute("data-leaving");

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.leaving;
  document.body.innerHTML = "";
});

function setup(html: string) {
  window.history.replaceState(null, "", "/blog");
  const host = document.createElement("div");
  host.innerHTML = html;
  document.body.append(host);
  // Links in tests would really navigate jsdom; stop the default after our listener has seen the click.
  host.addEventListener("click", (e) => e.preventDefault());
  return render(<NavFeedback />);
}

describe("NavFeedback", () => {
  it("dims the page at once when a link to another page is tapped", () => {
    setup(`<a href="/">Home</a>`);
    fireEvent.click(document.querySelector("a")!);
    expect(leaving()).toBe(true);
  });

  it("ignores links to the same page, new tabs and other sites", () => {
    setup(`<a id="same" href="/blog">Blog</a><a id="tab" href="/" target="_blank">Tab</a><a id="ext" href="https://github.com/">GitHub</a>`);
    for (const id of ["same", "tab", "ext"]) fireEvent.click(document.getElementById(id)!);
    expect(leaving()).toBe(false);
  });

  it("clears the dim when the new page arrives", () => {
    const { rerender } = setup(`<a href="/">Home</a>`);
    fireEvent.click(document.querySelector("a")!);
    pathname.value = "/";
    rerender(<NavFeedback />);
    expect(leaving()).toBe(false);
    pathname.value = "/blog";
  });
});
