import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/blog";
import { readingTime } from "@/lib/reading-time";

/**
 * Blog: the featured post as a cover card (black-and-white until hover, like the hero photo),
 * then the next posts as rows with their reading time, and a "View all blogs" button.
 */
export function BlogList({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <div>
      <Link
        href={`/blog/${lead.slug}`}
        className="group grid gap-5 rounded-card border border-border bg-card p-3 transition-colors duration-200 hover:border-border-hover sm:grid-cols-[220px_1fr] sm:items-center"
      >
        <span className="relative block aspect-[16/10] overflow-hidden rounded-[8px] bg-panel">
          <Image
            src={lead.image}
            alt={lead.imageAlt}
            fill
            sizes="(min-width: 640px) 220px, 100vw"
            className="object-cover grayscale transition-[filter,transform,translate,scale,rotate] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none"
          />
        </span>
        <span className="block px-1 pb-1 sm:p-0 sm:pr-3">
          <span className="block text-xs text-faint">
            Featured · {readingTime(lead.slug)}
          </span>
          <span className="mt-2 block text-lg leading-snug text-fg">
            {lead.title}
          </span>
          <span className="mt-1.5 line-clamp-2 block text-sm leading-6 text-muted">
            {lead.summary}
          </span>
        </span>
      </Link>

      {rest.length > 0 && (
        <ol className="m-0 mt-3 list-none border-b border-border p-0">
          {rest.map((p) => (
            <li key={p.slug} className="border-t border-border">
              <Link
                href={`/blog/${p.slug}`}
                className="group flex items-baseline gap-6 py-3.5"
              >
                <span className="min-w-0 flex-1 truncate text-[15px] text-muted transition-colors duration-150 group-hover:text-fg">
                  {p.title}
                </span>
                <span className="flex-none font-mono text-xs text-faint">
                  {readingTime(p.slug)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
      <div className="mt-8 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-pill border border-border px-4 py-2 text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:text-fg"
        >
          View all blogs
        </Link>
      </div>
    </div>
  );
}
