import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Sidebar, SidebarMark } from "./sidebar";
import { links as linkItems } from "@/content/links";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

afterEach(() => {
  cleanup();
  pathname.value = "/";
});

describe("Sidebar header", () => {
  it("the serif first names are the Home link", () => {
    render(<Sidebar onSearch={() => {}} />);
    const home = screen.getByRole("link", { name: /bryan jhade b\. ebuan, home/i });
    expect(home).toHaveAttribute("href", "/");
    expect(within(home).getByText("Jhade").tagName).toBe("I");
    expect(within(home).queryByText(/ebuan/i)).toBeNull();
    expect(home.querySelector("img")).toBeNull();
    expect(home.querySelector(".font-serif")).not.toBeNull();
  });

  it("marks the name as current on the home page only", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.getByRole("link", { name: /bryan jhade b\. ebuan/i })).toHaveAttribute("aria-current", "page");
    cleanup();
    pathname.value = "/stack";
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.getByRole("link", { name: /bryan jhade b\. ebuan/i })).not.toHaveAttribute("aria-current");
  });

  it("keeps the header clean: just the name, no role line", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.queryByText("Aspiring AI Software Engineer")).toBeNull();
  });


  it("has a full-width Search and no Contact in the header", () => {
    const onSearch = vi.fn();
    render(<Sidebar onSearch={onSearch} />);
    expect(screen.queryByRole("link", { name: /^contact$/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(onSearch).toHaveBeenCalled();
  });

  it("opens the contact form from the Email me button, closes on Escape", () => {
    render(<Sidebar onSearch={() => {}} />);
    const opener = screen.getByRole("button", { name: /email me/i });
    opener.focus(); // a real click focuses the button
    fireEvent.click(opener);
    const dialog = screen.getByRole("dialog", { name: /let's talk/i });
    for (const label of [/first name/i, /last name/i, /^email$/i, /message/i]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByLabelText(/first name/i)).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});

describe("Sidebar body", () => {
  it("has no separate Home tab and lists the portfolio pages in order", () => {
    render(<Sidebar onSearch={() => {}} />);
    const list = screen.getByRole("list", { name: "Portfolio" });
    const labels = within(list).getAllByRole("link").map((a) => a.getAttribute("data-label"));
    expect(labels).toEqual(["Projects", "Stack", "Certifications", "About me"]);
    expect(screen.queryByRole("link", { name: /^home/i })).toBeNull();
  });

  it("shows counts for projects and certifications", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(within(screen.getByRole("link", { name: /^Projects/ })).getByText("7")).toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /^Certifications/ })).getByText("13")).toBeInTheDocument();
  });

  it("marks the current section for nested paths", () => {
    pathname.value = "/projects/omnave";
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.getByRole("link", { name: /^Projects/ })).toHaveAttribute("aria-current", "page");
  });

  it("shows Explore as a list with a soon badge for empty pages and the links count", () => {
    render(<Sidebar onSearch={() => {}} />);
    const tiles = screen.getByRole("list", { name: "Explore" });
    const links = within(tiles).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("data-label"))).toEqual(["Blog", "Gear", "Links", "Resources"]);
    expect(within(screen.getByRole("link", { name: /^Gear/ })).queryByText("soon")).not.toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /^Resources/ })).queryByText("soon")).not.toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /^Links/ })).getByText(String(linkItems.length))).toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /^Blog/ })).queryByText("soon")).not.toBeInTheDocument();
  });

  it("marks the current Explore item", () => {
    pathname.value = "/links";
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.getByRole("link", { name: /^Links/ })).toHaveAttribute("aria-current", "page");
  });
});

describe("Sidebar footer", () => {
  it("no longer repeats the Currently building card", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.queryByText(/currently building/i)).toBeNull();
  });

  it("shows what I'm taking on with a Say hi button, not the year", () => {
    render(<Sidebar onSearch={() => {}} />);
    expect(screen.getByText("Taking on")).toBeInTheDocument();
    expect(screen.getByText("New projects")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /email me/i })).toHaveTextContent("Say hi");
    expect(screen.queryByText(/^©/)).toBeNull();
  });


  it("has GitHub and LinkedIn opening in a new tab, plus the theme toggle", () => {
    render(<Sidebar onSearch={() => {}} />);
    const gh = screen.getByRole("link", { name: /github/i });
    expect(gh.getAttribute("href")).toMatch(/github\.com\/itsmebryanjhade/);
    expect(gh).toHaveAttribute("target", "_blank");
    expect(within(gh).getByText("(opens in a new tab)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
  });
});

describe("Row states", () => {
  it("gives the current row a lit groove in semibold and other rows only a hover tint", () => {
    pathname.value = "/stack";
    render(<Sidebar onSearch={() => {}} />);
    const current = screen.getByRole("link", { name: /^Stack/ });
    const other = screen.getByRole("link", { name: /^Projects/ });
    expect(current.className).toMatch(/\blit-groove\b/);
    expect(current.className).toMatch(/\bfont-semibold\b/);
    expect(other.className).toMatch(/\bfont-medium\b/);
    expect(other.className).toMatch(/border-transparent/);
    expect(other.className).toMatch(/hover:bg-hover\/40/);
    expect(screen.queryByTestId("nav-highlight")).toBeNull();
  });
});

describe("SidebarMark", () => {
  it("is decoration only: the surname, hidden from assistive tech", () => {
    const { container } = render(<SidebarMark />);
    const mark = container.querySelector(".sidebar-mark");
    expect(mark?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(mark?.textContent).toBe("Ebuan");
    // cut off inside its own clipping layer, so it can't widen a scrolling panel
    expect(mark?.parentElement).toHaveClass("sidebar-mark-clip");
  });
});

describe("Drawer variant", () => {
  it("uses 44px touch targets", () => {
    render(<Sidebar onSearch={() => {}} variant="drawer" />);
    expect(screen.getByRole("button", { name: /email me/i }).className).toMatch(/min-h-11/);
    expect(screen.getByRole("button", { name: /search/i }).className).toMatch(/min-h-11/);
    expect(screen.getByRole("link", { name: /github/i }).className).toMatch(/h-11 w-11/);
    expect(screen.getByRole("link", { name: /^Projects/ }).className).toMatch(/min-h-11/);
    expect(screen.getByRole("button", { name: /switch to/i }).closest("[data-variant]")).toHaveAttribute("data-variant", "drawer");
  });
});
