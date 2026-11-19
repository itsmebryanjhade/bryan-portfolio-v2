import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { StatusDot } from "@/components/ui/status-dot";

const tag = "rounded-pill border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted";
const cardCls =
  "group block w-full overflow-hidden rounded-card border border-border bg-card transition-[color,background-color,border-color,transform,translate,scale,rotate] duration-150 hover:border-border-hover hover:bg-hover motion-safe:hover:-translate-y-px";

export function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-panel">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-medium text-fg">
            {project.title}
            {!project.hasDetail && <span className="sr-only"> (opens in a new tab)</span>}
          </h3>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {project.status === "Live" || project.status === "Live beta" ? <StatusDot /> : null}
            {project.status} · {project.year}
          </span>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted">{project.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.team && <span className={tag}>Team project</span>}
          {project.stack.length > 0 && (
            <span data-testid="stack-chips" className="contents">
              {project.stack.map((s) => (
                <span key={s} className={tag}>{s}</span>
              ))}
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (project.hasDetail) {
    return <Link href={`/projects/${project.slug}`} className={cardCls}>{body}</Link>;
  }
  return (
    <a href={project.href} target="_blank" rel="noreferrer" className={cardCls}>{body}</a>
  );
}
