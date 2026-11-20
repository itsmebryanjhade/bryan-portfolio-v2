"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, Search } from "lucide-react";
import { ContactDialog } from "@/components/contact/contact-dialog";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ManilaStatus } from "@/components/home/manila-status";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { SidebarMark, explore, isCurrent, openPalette, portfolio, trailing } from "./sidebar";
import type { NavItem } from "./nav-items";
import { FOCUSABLE } from "@/lib/focus";
import { profile } from "@/content/profile";

const SOCIAL_ICONS: Record<string, () => React.JSX.Element> = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon };

/** Header height; the menu sheet starts right under it. */
const BAR = "h-14";


/** A three-line hamburger; the outer lines fold into an ✕ and the middle one fades when open. */
function MenuIcon({ open }: { open: boolean }) {
  const line = "absolute left-0 h-[1.5px] w-[18px] rounded-full bg-current transition-[transform,top,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none";
  return (
    <span aria-hidden="true" className="relative block h-4 w-[18px]">
      <span className={`${line} ${open ? "top-[7px] rotate-45" : "top-[2px]"}`} />
      <span className={`${line} top-[7px] ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`${line} ${open ? "top-[7px] -rotate-45" : "top-[12px]"}`} />
    </span>
  );
}

function SheetGroup({ label, items, pathname, start }: { label: string; items: NavItem[]; pathname: string; start: number }) {
  return (
    <div>
      <p className="mb-1 px-3 text-[12.5px] font-medium text-faint">{label}</p>
      <ul aria-label={label} className="m-0 list-none p-0">
        {items.map((item, i) => {
          const current = isCurrent(pathname, item.href);
          const Icon = item.icon;
          const end = trailing(item);
          return (
            <li key={item.href} className="sheet-row" style={{ animationDelay: `${(start + i) * 35}ms` }}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`relative flex min-h-11 items-center gap-3 rounded-[12px] px-3 text-[16px] font-medium transition-colors duration-150 ${
                  current ? "lit-groove border font-semibold text-fg" : "border border-transparent text-muted active:bg-hover/60"
                }`}
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" className={current ? "text-fg" : "text-faint"} />
                <span className="flex-1">{item.label}</span>
                {end === "soon" ? (
                  <span className="text-[12px] text-faint">soon</span>
                ) : end ? (
                  <span className="text-[12px] tabular-nums text-faint">{end.count}</span>
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
 * The phone header: a hamburger on the left and your pixel face (home) on the right, pinned to the top.
 * The hamburger opens a floating side panel that slides in from the left and back out on close.
 */
export function MobileBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  // Stays true a moment after closing, so the panel can slide out before it's removed.
  const [mounted, setMounted] = useState(false);
  if (open && !mounted) setMounted(true);
  const [first, second] = profile.name.split(" ");

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    else if (wasOpen.current) menuRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (open || !mounted) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setMounted(false), reduce ? 0 : 260);
    return () => clearTimeout(id);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const els = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!els || els.length === 0) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const iconButton =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:text-fg active:bg-hover";

  return (
    <>
      {/* Pinned to the top: the page scrolls under it, frosted so content shows through softly. */}
      <header className={`sticky top-0 z-40 border-b border-border/60 bg-bg/75 backdrop-blur-md lg:hidden ${BAR}`}>
        {/* Menu on the left, your pixel face (home) on the right. Search lives in the menu. */}
        <div className="flex h-full items-center justify-between pl-1.5 pr-3">
          <button
            ref={menuRef}
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={iconButton}
          >
            <MenuIcon open={false} />
          </button>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              aria-current={isCurrent(pathname, "/") ? "page" : undefined}
              aria-label={`${profile.name}, home`}
              className="inline-flex h-11 w-11 items-center justify-center"
            >
              <Image src="/icon.svg" alt="" width={30} height={30} unoptimized className="h-[30px] w-[30px] rounded-[9px] ring-1 ring-border" />
            </Link>
          </div>
        </div>
      </header>

      {mounted && (
        // While closing, the panel stays briefly for its slide-out, inert and no longer a dialog.
        <div className="fixed inset-0 z-50 lg:hidden" onKeyDown={onKeyDown} inert={!open || undefined}>
          {/* touch-none: iOS ignores overflow:hidden on the page, so a swipe on the backdrop would scroll it */}
          <div className={`${open ? "sheet-fade" : "sheet-fade-out"} absolute inset-0 touch-none bg-bg/60`} onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={dialogRef}
            role={open ? "dialog" : undefined}
            aria-modal={open ? "true" : undefined}
            aria-label="Site menu"
            className={`${open ? "sheet-slide" : "sheet-slide-out"} grain-bg absolute bottom-2.5 left-2.5 top-2.5 flex w-[min(300px,calc(100vw-48px))] flex-col gap-5 overflow-y-auto overflow-x-hidden overscroll-contain rounded-[22px] edge-lit isolate p-2.5`}
          >
            <SidebarMark />
            <div className="grain-content flex items-center justify-between pl-2">
              {/* First names only, like the sidebar; the full name lives in the hero. */}
              <Link href="/" aria-label={`${profile.name}, home`} className="flex min-h-11 items-center">
                <span className="font-serif text-[18px] leading-none text-fg">
                  {first} <i>{second}</i>
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted active:bg-hover"
              >
                <MenuIcon open />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                // The sheet unmounts on close, so hand focus to the menu button first: the palette
                // records it as the opener and restores focus there.
                menuRef.current?.focus();
                setOpen(false);
                openPalette();
              }}
              className="sheet-row grain-content flex min-h-11 w-full items-center gap-2.5 rounded-pill border border-border px-4 text-sm text-faint"
            >
              <Search size={16} strokeWidth={1.6} aria-hidden="true" />
              Search
            </button>

            <nav aria-label="Primary" className="grain-content flex flex-col gap-4">
              <SheetGroup label="Portfolio" items={portfolio} pathname={pathname} start={1} />
              <SheetGroup label="Explore" items={explore} pathname={pathname} start={1 + portfolio.length} />
            </nav>

            {/* Footer, matching the sidebar: what I'm taking on with a Say hi button, one fading
                line, then my local time beside round GitHub, LinkedIn and theme buttons. */}
            {/* No side bleed (negative margins): in the scrolling panel Safari counted it as extra width and let
                the menu drag sideways. The inner padding is 10px smaller instead, so it looks the same. */}
            <div className="sheet-row grain-content -mb-2.5 mt-auto" style={{ animationDelay: "320ms" }}>
              <div className="flex items-center justify-between gap-3 px-1.5 pb-4 pt-1">
                <div className="min-w-0">
                  <p className="text-[12px] leading-4 text-faint">Taking on</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[14px] font-semibold leading-5 text-fg">
                    <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-status" />
                    New projects
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  aria-label="Email me"
                  className="inline-flex min-h-11 flex-none items-center gap-1.5 rounded-full border border-border bg-card px-4 text-[14px] font-semibold text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]"
                >
                  <Mail size={14} strokeWidth={1.7} aria-hidden="true" className="text-muted" />
                  Say hi
                </button>
              </div>
              <div aria-hidden="true" className="mx-1.5 h-px bg-gradient-to-r from-transparent via-border-hover to-transparent" />
              <div className="flex items-center justify-between gap-3 px-1.5 pb-3 pt-3">
                <ManilaStatus compact />
                <div data-variant="drawer" className="flex items-center gap-1.5">
                  {profile.socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.label];
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        // relative: keeps the screen-reader-only label inside the link, so Safari doesn't
                        // count it toward the menu's width (it let the menu drag sideways)
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted active:bg-hover"
                      >
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
        </div>
      )}
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
