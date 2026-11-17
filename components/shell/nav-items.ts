import { BookOpen, Briefcase, Award, FileText, Home, Layers, Link2, Package, Wrench, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: "projects" | "certifications";
  soonWhenEmpty?: "gear" | "resources";
};

export const NAV: { group: "Portfolio" | "Explore"; items: NavItem[] }[] = [
  {
    group: "Portfolio",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/projects", label: "Projects", icon: Briefcase, count: "projects" },
      { href: "/stack", label: "Stack", icon: Layers },
      { href: "/certifications", label: "Certifications", icon: Award, count: "certifications" },
      { href: "/about", label: "About me", icon: FileText },
    ],
  },
  {
    group: "Explore",
    items: [
      { href: "/blog", label: "Blog", icon: BookOpen },
      { href: "/gear", label: "Gear", icon: Wrench, soonWhenEmpty: "gear" },
      { href: "/links", label: "Links", icon: Link2 },
      { href: "/resources", label: "Resources", icon: Package, soonWhenEmpty: "resources" },
    ],
  },
];
