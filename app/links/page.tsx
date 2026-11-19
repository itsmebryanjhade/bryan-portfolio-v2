import type { Metadata } from "next";
import { ArrowUpRight, Link2, Mail } from "lucide-react";
import { DiscordIcon, FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CopyRow } from "@/components/links/copy-row";
import { EmptyState } from "@/components/ui/empty-state";
import { links } from "@/content/links";
import type { ListItem } from "@/content/types";
import { isEmpty } from "@/lib/content";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = {
  title: "Links",
  description: "Where to find Bryan Jhade online.",
};

function LinkIcon({ name }: { name: string }) {
  if (name === "GitHub") return <GitHubIcon />;
  if (name === "LinkedIn") return <LinkedInIcon />;
  if (name === "Instagram") return <InstagramIcon />;
  if (name === "Facebook") return <FacebookIcon />;
  if (name === "Discord") return <DiscordIcon />;
  if (name === "Email") return <Mail size={16} strokeWidth={1.6} aria-hidden="true" />;
  return <Link2 size={16} strokeWidth={1.6} aria-hidden="true" />;
}

function LinkRow({ item }: { item: ListItem }) {
  const external = !item.href?.startsWith("mailto:");
  return (
    <li className="border-t border-border">
      <a
        href={item.href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group -mx-3 flex items-center gap-4 rounded-[12px] px-3 py-3.5 transition-colors duration-150 hover:bg-hover/50"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-nav border border-border bg-card text-muted transition-colors duration-150 group-hover:border-border-hover group-hover:text-fg">
          <LinkIcon name={item.name} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-fg">{item.name}</span>
          {item.note && <span className="block truncate text-xs text-faint">{item.note}</span>}
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={1.6}
          aria-hidden="true"
          className="text-faint transition-[transform,translate,scale,rotate,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg motion-reduce:transition-none"
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  );
}

export default function LinksPage() {
  const groups = [...new Set(links.map((l) => l.category))];
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">
        Where to find me
      </h1>
      <p className="mt-3 text-sm text-muted">Code, work and a way to say hi.</p>

      {isEmpty(links) ? (
        <div className="mt-10">
          <EmptyState title="Links" body="Links coming soon." />
        </div>
      ) : (
        groups.map((group) => {
          const items = links.filter((l) => l.category === group);
          return (
            <section key={group} aria-labelledby={`links-${group}`} className="mt-12">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 id={`links-${group}`} className="text-xs text-faint">
                  {group}
                </h2>
                <span className="font-mono text-[11px] text-faint">{String(items.length).padStart(2, "0")}</span>
              </div>
              <ul className="border-b border-border">
                {items.map((item) =>
                  item.copy ? (
                    <CopyRow key={item.name} name={item.name} value={item.copy} icon={<LinkIcon name={item.name} />} />
                  ) : (
                    <LinkRow key={item.name} item={item} />
                  ),
                )}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}
