import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StatusDot } from "@/components/ui/status-dot";
import type { Project } from "@/content/types";
import { getProjects } from "@/lib/content";
import { ShelfCard } from "@/components/home/app-shelf";
import { standouts } from "@/content/standouts";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";
import { Morph } from "@/components/ui/morph";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Bryan Jhade: web apps, team builds and experiments, with honest notes on what is shipped.",
};

const count = (n: number) => String(n).padStart(2, "0");
const isLive = (p: Project) => p.status === "Live" || p.status === "Live beta";
const badge = "rounded-[5px] border border-border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.12em] text-faint";

/** Detail pages stay in the site; everything else opens the live project in a new tab. */
function ProjectLink({ project, className, children }: { project: Project; className: string; children: React.ReactNode }) {
  if (project.hasDetail) {
    return (
      <Link href={`/projects/${project.slug}`} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={project.href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Status({ project }: { project: Project }) {
  return (
    <span className="inline-flex flex-none items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
      {isLive(project) && <StatusDot />}
      {project.status}
    </span>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-t border-border">
      <ProjectLink
        project={project}
        className="group -mx-3 flex items-center gap-4 rounded-[12px] px-3 py-3.5 transition-colors duration-150 hover:bg-hover/50"
      >
        <Morph name={`project-${project.slug}`}>
          <span className="relative h-11 w-16 flex-none overflow-hidden rounded-nav border border-border bg-panel">
            <Image loading="eager" src={project.image} alt={project.imageAlt} fill sizes="64px" className="object-cover object-top" />
          </span>
        </Morph>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-fg">{project.title}</span>
            {project.kind !== "Personal" && <span className={badge}>{project.kind}</span>}
          </span>
          <span className="block truncate text-xs text-faint">{project.tagline}</span>
        </span>
        <span className="hidden sm:inline-flex">
          <Status project={project} />
        </span>
      </ProjectLink>
    </li>
  );
}

function Group({ id, label, items }: { id: string; label: string; items: Project[] }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 id={id} className="text-xs text-faint">
          {label}
        </h2>
        <span className="font-mono text-[11px] text-faint">{count(items.length)}</span>
      </div>
      <ul className="list-none border-b border-border p-0">
        {items.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  );
}

export default function ProjectsPage() {
  const standoutSlugs = new Set(standouts.map((s) => s.project.slug));
  const rest = getProjects().filter((p) => !standoutSlugs.has(p.slug));
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">
        Things I&apos;ve built
      </h1>
      <p className="mt-3 text-sm text-muted">Apps I build on my own, and the ones I built with a team.</p>

      <section aria-labelledby="projects-standouts" className="mt-12">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="projects-standouts" className="text-xs text-faint">
            Standouts
          </h2>
          <span className="font-mono text-[11px] text-faint">{count(standouts.length)}</span>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0">
          {standouts.map((item) => (
            <li key={item.project.slug} aria-label={item.project.title}>
              <ShelfCard item={item} front banner />
            </li>
          ))}
        </ul>
      </section>
      <Group id="projects-personal" label="Solo builds" items={rest.filter((p) => !p.team)} />
      {rest.some((p) => p.team) && <Group id="projects-team" label="Team builds" items={rest.filter((p) => p.team)} />}
    </div>
  );
}
