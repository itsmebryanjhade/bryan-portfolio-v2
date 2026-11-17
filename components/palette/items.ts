import { profile } from "@/content/profile";
import { getProjects } from "@/lib/content";
import { toggleTheme } from "@/lib/theme";
import { NAV } from "@/components/shell/nav-items";

export type PaletteItem = {
  id: string;
  group: "Pages" | "Projects" | "Actions";
  label: string;
  run(): void;
};

export function buildItems(push: (href: string) => void): PaletteItem[] {
  const pages: PaletteItem[] = NAV.flatMap((g) => g.items).map((n) => ({
    id: `page-${n.href}`,
    group: "Pages",
    label: n.label,
    run: () => push(n.href),
  }));

  const projects: PaletteItem[] = getProjects().map((p) => ({
    id: `project-${p.slug}`,
    group: "Projects",
    label: p.title,
    run: () => {
      if (p.hasDetail) push(`/projects/${p.slug}`);
      else if (p.href) window.open(p.href, "_blank", "noopener,noreferrer");
    },
  }));

  const actions: PaletteItem[] = [
    {
      id: "action-theme",
      group: "Actions",
      label: "Toggle theme",
      run: () => {
        toggleTheme();
      },
    },
    {
      id: "action-email",
      group: "Actions",
      label: "Copy email",
      run: () => {
        void navigator.clipboard?.writeText(profile.email).catch(() => {});
      },
    },
    {
      id: "action-terminal",
      group: "Actions",
      label: "Open terminal",
      run: () => window.dispatchEvent(new Event("open-terminal")),
    },
  ];

  return [...pages, ...projects, ...actions];
}
