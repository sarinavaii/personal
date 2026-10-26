import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentPosts, getPostBySlug, getPosts } from "@lib/posts";
import BlogDetailsTemplate from "@templates/BlogDetailsTemplate/BlogDetailsTemplate";
import { pageMetadata } from "@lib/seo";
import { JsonLd, blogPostingSchema, breadcrumbSchema } from "@lib/schema";
import { t } from "@lib/i18n";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {};
    }

    return pageMetadata({
        path: `/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: new Date(post.date).toISOString(),
        tags: post.tags,
    });
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;

    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { prevPost, nextPost } = getAdjacentPosts(slug);
    const translate = t();

    return (
        <>
            <JsonLd data={blogPostingSchema(post)} />
            <JsonLd
                data={breadcrumbSchema([
                    { name: translate("pages.home"), path: "/" },
                    { name: translate("pages.blog"), path: "/blog" },
                    { name: post.title, path: `/blog/${post.slug}` },
                ])}
            />
            <BlogDetailsTemplate post={post} nextPost={nextPost} prevPost={prevPost} />
        </>
    );
}
