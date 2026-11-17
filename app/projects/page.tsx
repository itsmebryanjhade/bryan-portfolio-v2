import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Bryan Jhade: web apps, team builds and experiments, with honest notes on what is shipped.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Projects</h1>
      <SectionHeader index="01" title="Projects" />
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {getProjects().map((p) => (
          <li key={p.slug} className="flex">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
