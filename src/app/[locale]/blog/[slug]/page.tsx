import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@lib/posts";
import BlogDetailsTemplate from "@templates/BlogDetailsTemplate/BlogDetailsTemplate";

export async function generateStaticParams() {
    return getPosts().map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogDetailsTemplate post={post} />;
}
