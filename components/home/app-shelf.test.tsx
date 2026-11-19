import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import { getProject } from "@/lib/content";
import { AppShelf, type ShelfItem } from "./app-shelf";

afterEach(cleanup);

const items: ShelfItem[] = [
  {
    project: getProject("omnave")!,
    meta: "Live beta",
    blurb: "b",
    gradient: "red",
    logo: "/images/logos/omnave.png",
    actions: [{ kind: "play-soon" }, { kind: "web", href: "https://omnave.vercel.app/" }],
  },
  {
    project: getProject("pondopath")!,
    meta: "Live",
    blurb: "b",
    gradient: "green",
    logo: "/images/logos/pondopath-mark.png",
    actions: [{ kind: "web", href: "https://pondopath.sanx.dev/" }],
  },
  {
    project: getProject("osc-halalan-2026")!,
    meta: "Case study",
    blurb: "b",
    gradient: "blue",
    logo: "halalan",
    actions: [{ kind: "case", href: "/projects/osc-halalan-2026" }],
  },
];

it("gives Omnave a Google Play 'soon' badge (not a link) and a web badge", () => {
  render(<AppShelf items={items} />);
  const omnave = screen.getByRole("article", { name: "Omnave" });
  expect(within(omnave).getByText("Google Play").closest("a")).toBeNull();
  expect(within(omnave).getByText("Soon")).toBeInTheDocument();
  const web = within(omnave).getByRole("link", { name: /open on the web/i });
  expect(web).toHaveAttribute("href", "https://omnave.vercel.app/");
  expect(web).toHaveAttribute("target", "_blank");
});

it("links Halalan to its case study on this site", () => {
  render(<AppShelf items={items} />);
  const halalan = screen.getByRole("article", { name: "OSC Halalan 2026" });
  expect(within(halalan).getByRole("link", { name: /read the case study/i })).toHaveAttribute("href", "/projects/osc-halalan-2026");
});

it("brings a side card to the top when clicked, and with the arrow keys", () => {
  render(<AppShelf items={items} />);
  fireEvent.click(screen.getByRole("button", { name: /bring osc halalan 2026 to the top/i }));
  expect(screen.getByRole("button", { name: /show osc halalan 2026/i })).toHaveAttribute("aria-current", "true");
  expect(screen.queryByRole("button", { name: /bring osc halalan 2026 to the top/i })).toBeNull();
  fireEvent.keyDown(screen.getByRole("group", { name: /selected projects/i }), { key: "ArrowRight" });
  expect(screen.getByRole("button", { name: /show omnave/i })).toHaveAttribute("aria-current", "true");
});

it("opens the project page from the card, while the web badge still opens the live site", () => {
  render(<AppShelf items={items} />);
  const card = screen.getByRole("article", { name: "PondoPath" });
  expect(within(card).getByRole("link", { name: /pondopath: project details/i })).toHaveAttribute("href", "/projects/pondopath");
  const web = within(card).getByRole("link", { name: /the web/i });
  expect(web).toHaveAttribute("href", "https://pondopath.sanx.dev/");
  expect(web).toHaveAttribute("target", "_blank");
});

it("swipes through the hand on touch", () => {
  render(<AppShelf items={items} />);
  const hand = screen.getByRole("group", { name: /selected projects/i });
  expect(screen.getByRole("button", { name: /show omnave/i })).toHaveAttribute("aria-current", "true");
  fireEvent.pointerDown(hand, { pointerType: "touch", clientX: 300 });
  fireEvent.pointerUp(hand, { pointerType: "touch", clientX: 200 });
  expect(screen.getByRole("button", { name: /show pondopath/i })).toHaveAttribute("aria-current", "true");
});
