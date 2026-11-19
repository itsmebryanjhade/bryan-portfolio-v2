import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/blog";
import { readingTime } from "@/lib/reading-time";

/**
 * The blog as a grid of covers: the image (black-and-white until hover), then the date, title
 * and reading time. The first post is the featured one.
 */
export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <ul aria-label="Posts" className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-7 p-0 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3">
      {posts.map((p, i) => (
        <li key={p.slug}>
          <Link href={`/blog/${p.slug}`} className="group block">
            <span className="relative block aspect-[16/10] overflow-hidden rounded-card border border-border bg-panel transition-colors duration-200 group-hover:border-border-hover">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 768px) 230px, 50vw"
                className="object-cover object-top grayscale transition-[filter,transform,translate,scale,rotate] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none"
              />
            </span>
            <span className="mt-3 block text-[11px] text-faint sm:mt-4 sm:text-xs">
              {p.date}
              {i === 0 && " · Featured"}
            </span>
            <span className="mt-1 block text-[13.5px] font-medium leading-snug text-fg sm:mt-1.5 sm:text-[16px]">{p.title}</span>
            <span className="mt-1.5 block text-[11px] text-faint transition-colors duration-200 group-hover:text-muted sm:mt-2 sm:text-xs">
              {readingTime(p.slug)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
