import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { NowStrip } from "./now-strip";

afterEach(cleanup);

it("shows where Bryan works, what he builds and what he learns, each as a link", () => {
  render(<NowStrip />);
  const nav = screen.getByRole("navigation", { name: "Right now" });
  const links = within(nav).getAllByRole("link");
  expect(links.map((a) => a.getAttribute("href"))).toEqual(["https://www.sanx.dev/about", "/projects/omnave", "/stack"]);
  expect(links[0]).toHaveTextContent(/Frontend & UI\s*SanX/);
  expect(links[0]).toHaveAttribute("target", "_blank");
  expect(links[1]).toHaveTextContent(/Building\s*Omnave/);
  expect(links[2]).toHaveTextContent(/Learning\s*Meta full-stack/);
});
