import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { HalalanCaseStudy } from "@/components/projects/halalan-case-study";
import { OmnaveDossier } from "@/components/projects/omnave-dossier";
import { StatusDot } from "@/components/ui/status-dot";
import { ToolTile } from "@/components/ui/tool-tile";
import type { Project } from "@/content/types";
import { getProject, getProjects } from "@/lib/content";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";
import { Morph } from "@/components/ui/morph";
import { Part } from "@/components/projects/part";

type Props = { params: Promise<{ slug: string }> };

/**
 * Project pages only: Instrument Sans for text and Instrument Serif for titles. Overriding the site's
 * font variables on the article swaps both inside it, so the shell and other pages keep their fonts.
 */
const sans = Instrument_Sans({ subsets: ["latin"] });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const fonts = {
  "--font-geist-sans": sans.style.fontFamily,
  "--font-newsreader": serif.style.fontFamily,
  fontFamily: sans.style.fontFamily,
} as React.CSSProperties;

const btn = "group inline-flex min-h-10 items-center gap-1.5 rounded-pill border px-4 text-sm transition-colors duration-150";
const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

function OutLink({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${btn} ${primary ? "border-fg bg-fg text-bg hover:bg-fg/85" : "border-border text-muted hover:border-border-hover hover:text-fg"}`}
    >
      {children}
      <ArrowUpRight
        size={15}
        strokeWidth={1.6}
        aria-hidden="true"
        className="transition-[translate] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** "https://kisap.vercel.app/" -> "kisap.vercel.app" */
const host = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/**
 * The project on a "stage": the site's dot-grid card with the app in a browser window standing in it.
 * Black-and-white at rest, colour and a small lift on hover, like the portrait on the home page.
 */
function Stage({ project }: { project: Project }) {
  return (
    <div className="no-enter group relative mt-10 overflow-hidden rounded-[22px] border border-border bg-card px-4 pt-8 sm:px-10 sm:pt-12">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--color-fg)_20%,transparent)_1px,transparent_1.2px)] bg-[length:12px_12px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
      />
      <span aria-hidden="true" className="absolute left-1/2 top-10 h-56 w-2/3 -translate-x-1/2 rounded-full bg-fg/10 blur-3xl" />
      <div
        className={`relative overflow-hidden rounded-t-[12px] border border-b-0 border-border-hover bg-panel shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.6)] transition-[translate] duration-700 ${EASE} group-hover:-translate-y-1.5 motion-reduce:transition-none`}
      >
        <div aria-hidden="true" className="flex items-center gap-3 border-b border-border px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
          </span>
          {project.href && (
            <span className="mx-auto truncate rounded-pill bg-bg/60 px-3 py-0.5 text-[11px] text-faint">{host(project.href)}</span>
          )}
        </div>
        {/* Sized by the screenshot itself (width/height are only a ratio hint), so no shot is ever cropped. */}
        {/* Same morph name as the project's thumbnail on /projects, so it grows into place. */}
        <Morph name={`project-${project.slug}`}>
          <div className="relative">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1600}
              height={1000}
              priority
              sizes="(min-width: 768px) 640px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        </Morph>
      </div>
    </div>
  );
}

/** Quick facts in one strip: year, type, status and who built it. */
function Facts({ project }: { project: Project }) {
  const live = project.status === "Live" || project.status === "Live beta";
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Year", value: project.year },
    { label: "Type", value: project.kind },
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-1.5">
          {live && <StatusDot />}
          {project.status}
        </span>
      ),
    },
    { label: "Built", value: project.team ? "Team project" : "Solo" },
  ];
  return (
    <dl className="mt-6 grid grid-cols-2 overflow-hidden rounded-card border border-border sm:grid-cols-4">
      {facts.map((f, i) => (
        <div
          key={f.label}
          className={`px-4 py-3.5 ${i % 2 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
        >
          <dt className="text-xs text-faint">{f.label}</dt>
          <dd className="mt-1 text-sm text-fg">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function NextProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group mt-20 flex items-center gap-4 rounded-card border border-border bg-card p-3 pr-5 transition-colors duration-200 hover:border-border-hover hover:bg-hover"
    >
      <Morph name={`project-${project.slug}`}>
        <span className="relative h-16 w-24 flex-none overflow-hidden rounded-nav border border-border bg-panel">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        </span>
      </Morph>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-faint">Next project</span>
        <span className="mt-0.5 block font-serif text-xl leading-tight text-fg">{project.title}</span>
        <span className="block truncate text-xs text-muted">{project.tagline}</span>
      </span>
      <ArrowRight
        size={18}
        strokeWidth={1.6}
        aria-hidden="true"
        className="flex-none text-faint transition-[translate,color] duration-200 group-hover:translate-x-1 group-hover:text-fg motion-reduce:transition-none"
      />
    </Link>
  );
}

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
  // Omnave brings its own phone screens below.
  const custom = project.slug === "omnave";
  const all = getProjects().filter((p) => p.hasDetail);
  const next = all[(all.findIndex((p) => p.slug === project.slug) + 1) % all.length];

  return (
    <article className={PAGE_FRAME} style={fonts}>
      <BackButton href="/projects" label="Projects" />
      <header>
        <h1 className="font-serif text-[44px] leading-[1.02] tracking-tight text-fg sm:text-[52px]">{project.title}</h1>
        <p className="mt-3 max-w-xl text-[17px] leading-7 text-muted">{project.tagline}</p>
        {(project.href || project.note) && (
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {project.href && (
              <OutLink href={project.href} primary>
                Open site
              </OutLink>
            )}
            {project.note && <span className="text-xs text-faint">{project.note}</span>}
          </div>
        )}
        <Facts project={project} />
      </header>

      {!custom && <Stage project={project} />}

      <Part id="overview-title" title="What it is">
        <p className="font-serif text-[22px] leading-[1.45] text-fg/90">{project.description}</p>
      </Part>

      {project.highlights && (
        <Part id="highlights-title" title="What it does">
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {/* An odd count lets the first card span the row, so the grid always closes evenly. */}
            {project.highlights.map((h, i) => (
              <li
                key={h}
                className={`rounded-card border border-border bg-card px-4 py-4 text-[14px] leading-6 text-muted transition-colors duration-200 hover:border-border-hover hover:text-fg ${
                  i === 0 && project.highlights!.length % 2 ? "sm:col-span-2 sm:text-[15px] sm:text-fg" : ""
                }`}
              >
                {h}
              </li>
            ))}
          </ul>
        </Part>
      )}

      {(project.role || project.stack.length > 0) && (
        <Part id="built-title" title="How I built it">
          {project.role && <p className="text-[15px] leading-7 text-muted">{project.role}</p>}
          {project.stack.length > 0 && (
            <ul className="m-0 mt-5 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3">
              {project.stack.map((s) => (
                <ToolTile key={s} item={{ name: s, category: "Tools", from: project.title }} />
              ))}
            </ul>
          )}
        </Part>
      )}

      {project.slug === "omnave" && <OmnaveDossier />}
      {project.slug === "osc-halalan-2026" && <HalalanCaseStudy />}

      {next && next.slug !== project.slug && <NextProject project={next} />}
    </article>
  );
}
