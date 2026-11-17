import type { Metadata } from "next";
import { Journey } from "@/components/about/journey";
import { SectionHeader } from "@/components/ui/section-header";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: "About Bryan Jhade: bio, journey, education and contact.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">About</h1>
      <SectionHeader index="01" title="The person" />
      <div className="space-y-3 text-[15px] leading-relaxed text-muted">
        <p>I&rsquo;m Bryan Jhade Bugauisan-Ebuan, an Information Technology student from the Philippines. I move between code and visual design because I care how a product works and how it feels to use.</p>
        <p>I&rsquo;m exploring how AI can become useful software and how to build safer systems.</p>
      </div>

      <div className="mt-12"><SectionHeader index="02" title="Journey" /></div>
      <Journey items={profile.journey} />

      <div className="mt-12"><SectionHeader index="03" title="Education" /></div>
      <ul className="list-none space-y-3 p-0">
        {profile.education.map((e) => (
          <li key={e.school} className="rounded-card border border-border bg-card p-4">
            <div className="text-[15px] font-medium text-fg">{e.school}</div>
            <div className="mt-1 text-[14px] text-muted">{e.program}</div>
            {e.note && <p className="mt-2 text-[13px] text-faint">{e.note}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-12"><SectionHeader index="04" title="Outside code" /></div>
      <p className="text-[15px] leading-relaxed text-muted">Photography and video keep my eye on composition, rhythm, and story. Those interests shape the details I notice when I build.</p>

      <div className="mt-12"><SectionHeader index="05" title="Contact" /></div>
      <ul className="flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[14px]">
        <li><a className="text-fg underline-offset-4 hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a></li>
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a className="text-fg underline-offset-4 hover:underline" href={s.href} target="_blank" rel="noreferrer">
              {s.label}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
