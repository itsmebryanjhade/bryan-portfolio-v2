import { Copy, FileText, Folder, SunMoon, SquareTerminal, type LucideIcon } from "lucide-react";
import { profile } from "@/content/profile";
import { posts } from "@/content/blog";
import { getProjects } from "@/lib/content";
import { toggleTheme } from "@/lib/theme";
import { HOME, NAV } from "@/components/shell/nav-items";

export type PaletteGroup = "Pages" | "Projects" | "Posts" | "Actions";

export type PaletteItem = {
  id: string;
  group: PaletteGroup;
  label: string;
  icon: LucideIcon;
  /** Quiet text on the right of the row, e.g. a year or date. */
  hint?: string;
  /** Extra words the search matches on (taglines, stack), never shown. */
  keywords?: string;
  run(): void;
};

export function buildItems(push: (href: string) => void): PaletteItem[] {
  const pages: PaletteItem[] = [HOME, ...NAV.flatMap((g) => g.items)].map((n) => ({
    id: `page-${n.href}`,
    group: "Pages",
    label: n.label,
    icon: n.icon,
    run: () => push(n.href),
  }));

  const projects: PaletteItem[] = getProjects().map((p) => ({
    id: `project-${p.slug}`,
    group: "Projects",
    label: p.title,
    icon: Folder,
    hint: p.year,
    keywords: `${p.tagline} ${p.stack.join(" ")}`,
    run: () => {
      if (p.hasDetail) push(`/projects/${p.slug}`);
      else if (p.href) window.open(p.href, "_blank", "noopener,noreferrer");
    },
  }));

  const blog: PaletteItem[] = posts.map((p) => ({
    id: `post-${p.slug}`,
    group: "Posts",
    label: p.title,
    icon: FileText,
    hint: p.date,
    run: () => push(`/blog/${p.slug}`),
  }));

  const actions: PaletteItem[] = [
    {
      id: "action-theme",
      group: "Actions",
      label: "Toggle theme",
      icon: SunMoon,
      keywords: "dark light mode",
      run: () => {
        toggleTheme();
      },
    },
    {
      id: "action-email",
      group: "Actions",
      label: "Copy email",
      icon: Copy,
      keywords: "contact mail",
      run: () => {
        void navigator.clipboard?.writeText(profile.email).catch(() => {});
      },
    },
    {
      id: "action-terminal",
      group: "Actions",
      label: "Open terminal",
      icon: SquareTerminal,
      keywords: "console shell",
      run: () => window.dispatchEvent(new Event("open-terminal")),
    },
  ];

  return [...pages, ...projects, ...blog, ...actions];
}

/** 0 = label starts with the query, 1 = label contains it, 2 = only a keyword does, -1 = no match. */
export function score(item: PaletteItem, q: string): number {
  if (!q) return 1;
  const label = item.label.toLowerCase();
  if (label.startsWith(q)) return 0;
  if (label.includes(q)) return 1;
  if (item.keywords?.toLowerCase().includes(q)) return 2;
  return -1;
}
