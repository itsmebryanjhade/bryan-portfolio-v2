import { GithubActivity } from "@/components/home/github-activity";
import { Hero } from "@/components/home/hero";
import { CertCard } from "@/components/certs/cert-card";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatRow } from "@/components/ui/stat-row";
import { getCredentialCount, getFeaturedCertifications, getFeaturedProjects, getStats } from "@/lib/content";

const GITHUB = "https://github.com/itsmebryanjhade";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl space-y-14 px-5 py-10 sm:px-8 lg:py-14">
      <Hero />
      <StatRow stats={getStats()} />

      <section aria-labelledby="home-projects">
        <SectionHeader id="home-projects" index="01" title="Projects" href="/projects" linkLabel="All projects" />
        <div className="grid gap-4 sm:grid-cols-3">
          {getFeaturedProjects().map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="home-certs">
        <SectionHeader id="home-certs" index="02" title="Certifications" href="/certifications" linkLabel={`All ${getCredentialCount()}`} ariaLabel={`All ${getCredentialCount()} certifications`} />
        <div className="grid gap-4 sm:grid-cols-3">
          {getFeaturedCertifications().map((c) => (
            <CertCard key={c.slug} cert={c} />
          ))}
        </div>
      </section>

      <section aria-labelledby="home-github">
        <SectionHeader id="home-github" index="03" title="GitHub" href={GITHUB} linkLabel="@itsmebryanjhade" external />
        <GithubActivity />
      </section>
    </div>
  );
}
