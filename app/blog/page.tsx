import type { Metadata } from "next";
import { PostGrid } from "@/components/blog/post-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { featuredPostSlug, posts } from "@/content/blog";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Bryan Jhade.",
};

export default function BlogPage() {
  // Featured post first, then the rest in their listed order.
  // Featured first, then newest first. Dates are "Mon YYYY".
  const when = (d: string) => Date.parse(`1 ${d}`);
  const ordered = [...posts].sort(
    (a, b) => Number(b.slug === featuredPostSlug) - Number(a.slug === featuredPostSlug) || when(b.date) - when(a.date),
  );
  return (
    <div className={PAGE_FRAME}>
      <BackButton />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">Notes from the build</h1>
      <p className="mt-3 text-sm text-muted">What I learn while building things, the wins and the honest parts.</p>
      <div className="mt-12">
        {posts.length === 0 ? (
          <EmptyState title="First posts coming soon" body="Writing on what I build and learn will appear here." />
        ) : (
          <PostGrid posts={ordered} />
        )}
      </div>
    </div>
  );
}
