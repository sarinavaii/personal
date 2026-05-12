import { posts } from "../../.velite";

export function getPosts() {
    return posts
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
    return posts.find((post) => post.slug === slug);
}
