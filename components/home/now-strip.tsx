import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { SanXLogo } from "@/components/ui/brand-icons";
import { StatusDot } from "@/components/ui/status-dot";
import { getFeaturedProjects } from "@/lib/content";

/**
 * What Bryan is doing right now, in place of vanity numbers. Each item links to where it lives.
 * Always three columns; on phones each icon sits above its text so all three fit side by side.
 */
export function NowStrip() {
  const building = getFeaturedProjects()[0];
  const cells: {
    label: string;
    value: string;
    href: string;
    live: boolean;
    external?: boolean;
    logo: React.ReactNode;
  }[] = [
    {
      label: "Frontend & UI",
      value: "SanX",
      href: "https://www.sanx.dev/about",
      live: false,
      external: true,
      logo: <SanXLogo className="h-4 w-auto" />,
    },
    {
      label: "Building",
      value: building.title,
      href: building.hasDetail ? `/projects/${building.slug}` : "/projects",
      live: true,
      logo: (
        <Image
          src="/images/logos/omnave.png"
          alt=""
          width={22}
          height={22}
          loading="eager"
          className="h-[22px] w-[22px]"
        />
      ),
    },
    {
      label: "Learning",
      value: "Meta full-stack",
      href: "/stack",
      live: false,
      logo: <BookOpen size={16} strokeWidth={1.6} aria-hidden="true" />,
    },
  ];

  return (
    <nav aria-label="Right now">
      <ul className="m-0 grid list-none grid-cols-3 border-y border-border p-0">
        {cells.map((c, i) => (
          <li
            key={c.label}
            className={`min-w-0 ${i > 0 ? "border-l border-border" : ""}`}
          >
            <Link
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`group flex h-full items-center justify-between gap-3 py-4 transition-colors duration-150 sm:py-5 ${i > 0 ? "pl-3 sm:pl-5" : ""} ${i < 2 ? "pr-3 sm:pr-5" : ""}`}
            >
              <span className="flex min-w-0 flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-nav border border-border bg-card text-muted grayscale transition-[filter,color,border-color] duration-500 group-hover:border-border-hover group-hover:text-fg group-hover:grayscale-0"
                >
                  {c.logo}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-[11px] text-faint sm:text-xs">
                    {c.live && <StatusDot />}
                    {c.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted transition-colors duration-150 group-hover:text-fg sm:mt-1 sm:text-[15px]">
                    {c.value}
                  </span>
                  {c.external && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
