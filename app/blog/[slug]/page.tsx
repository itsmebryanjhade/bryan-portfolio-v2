import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { postModules, posts } from "@/content/blog";

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
    <article className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="text-2xl font-medium text-fg">{post.title}</h1>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{post.date}</p>
      <div className="mt-6 text-[14px] leading-relaxed text-muted">
        <Post />
      </div>
    </article>
  );
}
