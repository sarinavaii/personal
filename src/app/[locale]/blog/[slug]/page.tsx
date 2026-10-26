import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAdjacentPosts, getPostBySlug, getPosts } from "@lib/posts";
import BlogDetailsTemplate from "@templates/BlogDetailsTemplate/BlogDetailsTemplate";
import { pageMetadata } from "@lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
    return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {};
    }

    return pageMetadata({
        locale,
        path: `/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: new Date(post.date).toISOString(),
        tags: post.tags,
    });
}

export default async function PostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { prevPost, nextPost } = getAdjacentPosts(slug);

    return <BlogDetailsTemplate post={post} nextPost={nextPost} prevPost={prevPost} />;
}
