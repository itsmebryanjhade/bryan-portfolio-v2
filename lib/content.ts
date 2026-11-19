import { badges } from "@/content/badges";
import { certifications } from "@/content/certifications";
import { projects } from "@/content/projects";
import type { Certification, ListItem, Project } from "@/content/types";

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getFeaturedCertifications(): Certification[] {
  return certifications.filter((c) => c.featured);
}

/** Certificates plus badges that are not the same achievement as a certificate. */
export function getCredentialCount(): number {
  return certifications.length + badges.filter((b) => !b.certification).length;
}

export function getStats(): { label: string; value: string }[] {
  return [
    { label: "Projects shipped", value: String(projects.length) },
    { label: "Credentials", value: String(getCredentialCount()) },
    { label: "Started BSIT", value: "2026" },
  ];
}

export function getNavCounts(): { projects: number; certifications: number } {
  return { projects: projects.length, certifications: getCredentialCount() };
}

export function isEmpty(list: ListItem[]): boolean {
  return list.length === 0;
}
