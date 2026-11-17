import Image from "next/image";

export function HalalanCaseStudy() {
  return (
    <section aria-labelledby="halalan-story-title" className="mt-10">
      <h2 id="halalan-story-title" className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        Case study
      </h2>
      <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-card border border-border bg-panel">
        <Image
          src="/images/projects/halalan-2026-preview.png"
          alt="OSC Halalan 2026 voter verification screen"
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <p className="mt-4 text-[15px] leading-7 text-muted">
        I was a Grade 12 HUMSS student and an officer of the Odizee Student Council (OSC). With my team, I helped run
        the school election using a voter-verification and ballot web system.
      </p>
      <p className="mt-3 text-sm leading-6 text-faint">More details about this project are coming.</p>
    </section>
  );
}
