import type { Metadata } from "next";
import Link from "next/link";
import { GetInTouch } from "@/components/about/get-in-touch";
import { Journey } from "@/components/about/journey";
import { PhotoSlots } from "@/components/about/photo-slots";
import { profile } from "@/content/profile";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = {
  title: "About",
  description: "About Bryan Jhade: bio, journey, education and contact.",
};

const count = (n: number) => String(n).padStart(2, "0");

function GroupHeading({ id, label, n }: { id: string; label: string; n?: number }) {
  return (
    <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
      <h2 id={id} className="text-xs text-faint">
        {label}
      </h2>
      {n !== undefined && <span className="font-mono text-[11px] text-faint">{count(n)}</span>}
    </div>
  );
}

export default function AboutPage() {
  const given = profile.name.split(" ");
  const surname = given.pop();
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">
        More about me
      </h1>

      <div className="mt-10">
        <PhotoSlots />
      </div>

      <section aria-labelledby="about-intro" className="mt-12">
        <h2 id="about-intro" className="font-serif text-2xl leading-none text-fg">
          {given.join(" ")} <i>{surname}</i>
        </h2>
        <p className="mt-2 text-xs text-faint">{profile.roleLine}</p>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
          <p>
            {profile.intro.map((part, i) =>
              typeof part === "string" ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i} className="text-fg">
                  {part.pill}
                </span>
              ),
            )}{" "}
            {profile.introMore}
          </p>
          <p>
            I move between code and visual design because I care how a product works and how it feels to use. I&rsquo;m
            exploring how AI can become genuinely useful software, and how to build systems people can trust.
          </p>
          <p>
            Outside code, photography and video keep my eye on composition, rhythm and story. Those shape the details I
            notice when I build.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <GetInTouch />
          <Link href="/links" className="text-sm text-muted transition-colors duration-150 hover:text-fg">
            Find me online
          </Link>
        </div>
      </section>

      <section aria-labelledby="about-journey" className="mt-14">
        <GroupHeading id="about-journey" label="Journey" n={profile.journey.length} />
        <Journey items={profile.journey} />
      </section>
    </div>
  );
}
