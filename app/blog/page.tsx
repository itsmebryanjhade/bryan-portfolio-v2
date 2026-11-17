import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Bryan Jhade.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="sr-only">Blog</h1>
      <SectionHeader index="01" title="Blog" />
      {posts.length === 0 ? (
        <EmptyState title="First posts coming soon" body="Writing on what I build and learn will appear here." />
      ) : (
        <ul className="grid list-none gap-3 p-0">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block rounded-card border border-border bg-card p-5 transition-colors duration-150 hover:border-border-hover">
                <h3 className="text-[15px] font-medium text-fg">{p.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{p.date}</p>
                <p className="mt-2 text-[13px] text-muted">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
