import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HalalanCaseStudy } from "@/components/projects/halalan-case-study";
import { OmnaveDossier } from "@/components/projects/omnave-dossier";
import { StatusDot } from "@/components/ui/status-dot";
import { getProject, getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const tag = "rounded-pill border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted";
const link =
  "inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:text-fg";

export function generateStaticParams() {
  return getProjects().filter((p) => p.hasDetail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.hasDetail) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <header>
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {project.status === "Live" || project.status === "Live beta" ? <StatusDot /> : null}
          {project.status} · {project.year}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-fg">{project.title}</h1>
        <p className="mt-2 text-base text-muted">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5">
          {project.href && (
            <a href={project.href} target="_blank" rel="noreferrer" className={link}>
              Live<span aria-hidden="true">&nbsp;↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className={link}>
              GitHub<span aria-hidden="true">&nbsp;↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.note && <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{project.note}</span>}
        </div>
      </header>

      <section aria-labelledby="overview-title" className="mt-8">
        <h2 id="overview-title" className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          Overview
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.team && <span className={tag}>Team project</span>}
          {project.stack.map((s) => (
            <span key={s} className={tag}>{s}</span>
          ))}
        </div>
      </section>

      {project.slug === "omnave" && <OmnaveDossier />}
      {project.slug === "osc-halalan-2026" && <HalalanCaseStudy />}
    </article>
  );
}
