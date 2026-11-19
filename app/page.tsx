import { GithubActivity } from "@/components/home/github-activity";
import { Hero } from "@/components/home/hero";
import { NowStrip } from "@/components/home/now-strip";
import Link from "next/link";
import { AppShelf } from "@/components/home/app-shelf";
import { standouts as featured } from "@/content/standouts";
import { BlogList } from "@/components/home/blog-list";
import { ExperienceList } from "@/components/home/experience-list";
import { StackRows } from "@/components/home/stack-rows";
import { posts } from "@/content/blog";
import { experience } from "@/content/experience";
import { CertShowcase } from "@/components/home/cert-showcase";
import { SectionHeader } from "@/components/ui/section-header";
import { getCredentialCount, getFeaturedCertifications } from "@/lib/content";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { Reveal } from "@/components/ui/reveal";
import { fetchContributions, streaks } from "@/lib/github";

/** Blog posts on the home page: the first is highlighted with its cover. */
const HOME_POSTS = ["wrong-strand-right-direction", "i-started-with-a-chat-window", "my-first-hackathon-solo"];
const homePosts = HOME_POSTS.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined);



export default async function Home() {
  // Same cached request as the GitHub section below, so this adds no extra fetch.
  const contributions = await fetchContributions();
  const activity = contributions ? { total: contributions.total, ...streaks(contributions.days) } : null;
  return (
    <div className={`${PAGE_FRAME} space-y-20`}>
      <div className="space-y-14">
        <Hero activity={activity} />
        <NowStrip />
      </div>

      <Reveal>
        <section aria-labelledby="home-projects">
          <SectionHeader id="home-projects" title="Selected work" count={featured.length} />
          <AppShelf items={featured} />
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 rounded-pill border border-border px-4 py-2 text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:text-fg"
            >
              Show more projects

            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="home-experience">
          <SectionHeader id="home-experience" title="Experience" count={experience.length} />
          <ExperienceList items={experience} />
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="home-stack">
          <SectionHeader id="home-stack" title="Stack" />
          <StackRows />
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="home-certs">
          <SectionHeader id="home-certs" title="Certifications" count={getCredentialCount()} />
          <CertShowcase certs={getFeaturedCertifications()} more={getCredentialCount() - getFeaturedCertifications().length} />
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="home-blog">
          <SectionHeader id="home-blog" title="Blog" count={posts.length} />
          <BlogList posts={homePosts} />
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="home-github">
          <SectionHeader id="home-github" title="GitHub" />
          <GithubActivity />
        </section>
      </Reveal>
    </div>
  );
}
