import { notFound } from "next/navigation";
import { getAdjacentPosts, getPostBySlug } from "@lib/posts";
import BlogDetailsTemplate from "@templates/BlogDetailsTemplate/BlogDetailsTemplate";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { prevPost, nextPost } = getAdjacentPosts(slug);

    return <BlogDetailsTemplate post={post} nextPost={nextPost} prevPost={prevPost} />;
}
