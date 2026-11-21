import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { postModules, posts } from "@/content/blog";
import { PAGE_FRAME } from "@/components/ui/page-frame";
import { BackButton } from "@/components/ui/back-button";
import { readingTime } from "@/lib/reading-time";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const load = postModules[slug];
  if (!load) notFound();
  const { default: Post } = await load();
  return (
    <article className={PAGE_FRAME}>
      <BackButton href="/blog" label="Blog" />
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-fg">{post.title}</h1>
      <p className="mt-2 text-sm text-faint">
        {post.date} · {readingTime(post.slug)}
      </p>
      {/* Black and white like the blog grid; hover (or a tap, via TouchMotion) brings the colour back. */}
      <div className="group mt-8 overflow-hidden rounded-card border border-border">
        <Image
          src={post.image}
          alt={post.imageAlt}
          width={1600}
          height={900}
          loading="eager"
          sizes="(min-width: 640px) 608px, calc(100vw - 40px)"
          className="block aspect-video w-full object-cover object-center grayscale transition-[filter] duration-700 group-hover:grayscale-0 motion-reduce:transition-none"
        />
      </div>
      <div className="mt-10 space-y-5 text-[15px] leading-8 text-muted [&_h2]:pt-6 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-fg [&_strong]:text-fg">
        <Post />
      </div>
    </article>
  );
}
