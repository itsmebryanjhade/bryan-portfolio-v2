"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { ContactDialog } from "@/components/contact/contact-dialog";
import { Mail, Search } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ManilaStatus } from "@/components/home/manila-status";
import { posts } from "@/content/blog";
import { gear } from "@/content/gear";
import { links } from "@/content/links";
import { profile } from "@/content/profile";
import { resources } from "@/content/resources";
import { getNavCounts, isEmpty } from "@/lib/content";
import { useShortcutLabel } from "@/components/palette/use-shortcut";
import { NAV, type NavItem } from "./nav-items";

const counts = getNavCounts();
const empty = { gear: gear.length === 0, resources: isEmpty(resources) };
export const portfolio = NAV.find((g) => g.group === "Portfolio")!.items;
export const explore = NAV.find((g) => g.group === "Explore")!.items;

export function ShortcutHint({ label = "Ctrl K" }: { label?: string }) {
  return (
    <kbd className="rounded-pill border border-border px-1.5 py-0.5 font-sans text-[11px] text-faint">{label}</kbd>
  );
}

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

export function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

/** What sits at the end of a row: a count, a "soon" badge for empty pages, or nothing. */
export function trailing(item: NavItem): { count: number } | "soon" | null {
  if (item.count) return { count: counts[item.count] };
  if ((item.soonWhenEmpty && empty[item.soonWhenEmpty]) || (item.href === "/blog" && posts.length === 0)) return "soon";
  if (item.href === "/links") return { count: links.length };
  return null;
}

const SOCIAL_ICONS: Record<string, () => React.JSX.Element> = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon };

const iconButtonBase =
  "inline-flex items-center justify-center rounded-full border border-border text-muted transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg";

function NavList({
  label,
  items,
  pathname,
  rowHeight,
  gliding,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  rowHeight: string;
  /** True once the sliding pill is measured; the current row then drops its own pill. */
  gliding: boolean;
}) {
  return (
    <div>
      <p className="mb-2.5 px-3 text-[12.5px] font-medium text-faint">{label}</p>
      <ul aria-label={label} className="flex flex-col gap-0.5">
          {items.map((item) => {
            const current = isCurrent(pathname, item.href);
            const Icon = item.icon;
            const end = trailing(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-label={item.label}
                  aria-current={current ? "page" : undefined}
                  className={`group relative flex ${rowHeight} items-center gap-3 rounded-[10px] border px-3 text-[15px] font-medium transition-colors duration-200 ${
                    current
                      ? gliding
                        ? "border-transparent font-semibold text-fg"
                        : "lit-groove font-semibold text-fg"
                      : "border-transparent text-muted hover:bg-hover/40 hover:text-fg"
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className={`transition-colors duration-200 ${current ? "text-fg" : "text-faint group-hover:text-fg"}`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {end === "soon" ? (
                    <span className="text-[12px] text-faint">soon</span>
                  ) : end ? (
                    <span className="font-mono text-[12px] text-faint">{end.count}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

/**
 * One highlight pill for the whole nav that glides to the current tab on navigation, instead of
 * each row switching its own background. Measured after layout; if measuring fails (no layout,
 * e.g. tests) the current row keeps its own pill.
 */
function useGlidingPill(pathname: string) {
  const navRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState<{ top: number; height: number; shown: boolean } | null>(null);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!nav) return;
    if (!link) {
      setBox((b) => (b ? { ...b, shown: false } : b));
      return;
    }
    const height = link.offsetHeight;
    if (!height) return;
    const top = link.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop;
    setBox({ top, height, shown: true });
  }, [pathname]);

  // Turn the glide on only after the first placement, so the pill doesn't fly in on load.
  useLayoutEffect(() => {
    if (box && !animate) requestAnimationFrame(() => setAnimate(true));
  }, [box, animate]);

  return { navRef, box, animate };
}

export function Sidebar({
  onSearch,
  shortcut,
  variant = "panel",
}: {
  onSearch: () => void;
  shortcut?: string;
  variant?: "panel" | "drawer";
}) {
  const pathname = usePathname();
  const platformLabel = useShortcutLabel();
  const drawer = variant === "drawer";
  const rowHeight = drawer ? "min-h-11" : "min-h-9";
  const controlHeight = drawer ? "min-h-11" : "min-h-9"; // 44px touch targets in the drawer
  const iconButton = `${iconButtonBase} ${drawer ? "h-11 w-11" : "h-8 w-8"}`;
  const [first, second] = profile.name.split(" ");
  const onHome = isCurrent(pathname, "/");
  const [contactOpen, setContactOpen] = useState(false);
  const { navRef, box: pillBox, animate: pillAnimate } = useGlidingPill(pathname);

  return (
    <div data-variant={variant} className="grain-content flex h-full flex-col gap-6 px-3 pb-3 pt-4">
      {/* Header: name (Home link) and Search, with room to breathe between them */}
      <div className="flex flex-col gap-5">
        <Link
          href="/"
          aria-current={onHome ? "page" : undefined}
          aria-label={`${profile.name}, home`}
          className="rounded-[10px] px-2.5 py-1"
        >
          {/* First names only, to keep the top quiet; the full name lives in the hero. */}
          <span className="font-serif text-[18px] leading-none text-fg">
            {first} <i>{second}</i>
          </span>
        </Link>
        <button
          type="button"
          onClick={onSearch}
          className={`group flex ${controlHeight} w-full items-center gap-2.5 rounded-pill border border-border px-3.5 text-[14px] font-medium text-faint transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg`}
        >
          <Search size={15} strokeWidth={1.6} aria-hidden="true" />
          <span className="flex-1 text-left">Search</span>
          <ShortcutHint label={shortcut ?? platformLabel} />
        </button>
      </div>

      {/* Body: Portfolio + Explore lists */}
      <nav ref={navRef} aria-label="Primary" className="relative flex flex-1 flex-col gap-6 overflow-y-auto">
        {pillBox && (
          <span
            aria-hidden="true"
            className={`lit-groove pointer-events-none absolute inset-x-0 top-0 rounded-[10px] border ${
              pillAnimate ? "transition-[transform,height,opacity] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)]" : ""
            }`}
            style={{ transform: `translateY(${pillBox.top}px)`, height: pillBox.height, opacity: pillBox.shown ? 1 : 0 }}
          />
        )}
        <NavList label="Portfolio" items={portfolio} pathname={pathname} rowHeight={rowHeight} gliding={!!pillBox} />
        <NavList label="Explore" items={explore} pathname={pathname} rowHeight={rowHeight} gliding={!!pillBox} />
      </nav>

      {/* Footer: what I'm taking on, with a solid "Say hi" button to reach me; one fading line; then
          my local time beside round GitHub, LinkedIn and theme buttons. */}
      <div className="-mx-3 -mb-3">
        <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-2">
          <div className="min-w-0">
            <p className="text-[12px] leading-4 text-faint">Taking on</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[14px] font-semibold leading-5 text-fg">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5 flex-none">
                <span className="absolute inset-0 animate-ping rounded-full bg-status opacity-60 motion-reduce:animate-none" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-status" />
              </span>
              New projects
            </p>
          </div>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            aria-label="Email me"
            className={`group inline-flex ${drawer ? "min-h-11" : "h-8"} flex-none items-center gap-1.5 rounded-full border border-border bg-card px-3 text-[13.5px] font-semibold text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] transition-colors duration-150 hover:border-border-hover hover:bg-hover`}
          >
            <Mail size={13} strokeWidth={1.7} aria-hidden="true" className="text-muted transition-[color,translate] duration-200 group-hover:-translate-y-px group-hover:text-fg motion-reduce:transition-none" />
            Say hi
          </button>
        </div>
        <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
        <div aria-hidden="true" className="mx-4 h-px bg-gradient-to-r from-transparent via-border-hover to-transparent" />
        <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-3.5">
          <ManilaStatus compact />
          <div className="flex items-center gap-1">
            {profile.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className={iconButton}>
                  {Icon ? <Icon /> : <span aria-hidden="true">{"↗"}</span>}
                  <span className="sr-only">
                    {s.label} <span>(opens in a new tab)</span>
                  </span>
                </a>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * A giant, faint surname ("Ebuan", the hero's italic word, the one part of the name the sidebar doesn't
 * show) running up the panel's right edge, cut off by the border and fading out toward the top.
 * Decoration only: hidden from assistive tech, never selectable or clickable. Needs an isolated,
 * overflow-hidden panel to sit in.
 */
export function SidebarMark() {
  const surname = profile.name.split(" ").at(-1);
  return (
    <span aria-hidden="true" className="sidebar-mark">
      {surname}
    </span>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="grain-bg fixed bottom-3.5 left-3.5 top-3.5 z-30 hidden w-[264px] overflow-hidden rounded-[18px] edge-lit lg:block">
      <SidebarMark />
      <Sidebar onSearch={openPalette} />
    </aside>
  );
}
