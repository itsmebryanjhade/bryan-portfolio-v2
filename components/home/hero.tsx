import Image from "next/image";
import { profile } from "@/content/profile";
import { Pill } from "@/components/ui/pill";

export function Hero() {
  return (
    <section aria-label="Introduction">
      <div className="flex items-center gap-5 sm:gap-6">
        <Image
          src="/profile.png"
          alt="Portrait of Bryan Jhade"
          width={104}
          height={104}
          priority
          sizes="104px"
          className="h-20 w-20 shrink-0 rounded-full border border-border object-cover sm:h-[104px] sm:w-[104px]"
        />
        <div>
          <h1 className="font-serif text-4xl leading-none tracking-tight text-fg sm:text-5xl">
            Bryan <em>Jhade</em>
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{profile.roleLine}</p>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg sm:leading-9">
        {profile.intro.map((part, i) =>
          typeof part === "string" ? (
            <span key={i}>{part}</span>
          ) : (
            <Pill key={i} icon={part.icon}>{part.pill}</Pill>
          ),
        )}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.1em]">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" className="text-muted transition-colors duration-150 hover:text-fg">
              {s.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors duration-150 hover:text-fg">
            Email
          </a>
        </li>
      </ul>
    </section>
  );
}
