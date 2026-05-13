import { posts } from "@velite";

export function getPosts() {
    return posts
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
    return posts.find((post) => post.slug === slug);
}

export function getLatestPosts(count: number) {
    return posts
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
}

export function getAdjacentPosts(slug: string) {
    const allPosts = getPosts();
    const index = allPosts.findIndex((post) => post.slug === slug);

    return {
        prevPost: index > 0 ? allPosts[index - 1] : null, // newer
        nextPost: index < allPosts.length - 1 ? allPosts[index + 1] : null, // older
    };
}
