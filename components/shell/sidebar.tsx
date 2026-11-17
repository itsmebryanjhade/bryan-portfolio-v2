"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { StatusDot } from "@/components/ui/status-dot";
import { gear } from "@/content/gear";
import { profile } from "@/content/profile";
import { resources } from "@/content/resources";
import { getNavCounts, isEmpty } from "@/lib/content";
import { useShortcutLabel } from "@/components/palette/use-shortcut";
import { NAV } from "./nav-items";

const counts = getNavCounts();
const empty = { gear: isEmpty(gear), resources: isEmpty(resources) };

export function ShortcutHint({ label = "Ctrl K" }: { label?: string }) {
  return (
    <kbd className="rounded-pill border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">{label}</kbd>
  );
}

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar({ onSearch, shortcut }: { onSearch: () => void; shortcut?: string }) {
  const pathname = usePathname();
  const platformLabel = useShortcutLabel();
  return (
    <div className="flex h-full flex-col gap-5 p-4">
      <div className="flex items-center gap-3">
        <Image src="/profile.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg">{profile.name}</p>
          <p className="truncate text-xs text-muted">{profile.roleLine}</p>
        </div>
        <ThemeToggle />
      </div>

      <button
        type="button"
        onClick={onSearch}
        aria-label="Search"
        className="flex w-full items-center gap-2 rounded-nav border border-border px-3 py-2 text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg"
      >
        <Search size={16} strokeWidth={1.6} aria-hidden="true" />
        <span className="flex-1 text-left">Search</span>
        <ShortcutHint label={shortcut ?? platformLabel} />
      </button>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-5 overflow-y-auto">
        {NAV.map((g) => (
          <div key={g.group}>
            <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{g.group}</p>
            <ul className="flex flex-col gap-0.5">
              {g.items.map((item) => {
                const current = isCurrent(pathname, item.href);
                const Icon = item.icon;
                const soon = item.soonWhenEmpty ? empty[item.soonWhenEmpty] : false;
                const count = item.count ? counts[item.count] : undefined;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-label={item.label}
                      aria-current={current ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-nav min-h-11 px-3 py-2 text-sm transition-colors duration-150 hover:bg-hover hover:text-fg ${
                        current ? "bg-hover text-fg" : "text-muted"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                      <span className="flex-1">{item.label}</span>
                      {count !== undefined && <span className="font-mono text-[11px] text-faint">{count}</span>}
                      {soon && <span className="rounded-pill border border-border px-1.5 font-mono text-[10px] uppercase tracking-wider text-faint">soon</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center justify-center gap-2 rounded-nav border border-border px-3 py-2 text-sm text-fg transition-colors duration-150 hover:border-border-hover hover:bg-hover"
        >
          <Mail size={16} strokeWidth={1.6} aria-hidden="true" />
          Contact me
        </a>
        <p className="flex items-center gap-2 px-1 text-xs text-muted">
          <StatusDot />
          {profile.availability}
        </p>
      </div>
    </div>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-panel lg:block">
      <Sidebar onSearch={openPalette} />
    </aside>
  );
}
