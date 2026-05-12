import XSection from "@atoms/XSection";
import { getPosts } from "@lib/posts";
import { useTranslations } from "next-intl";
import Link from "next/link";

const BlogTemplate = () => {
    const t = useTranslations("home.blogs");
    const posts = getPosts();

    return (
        <>
            <XSection transparent>
                <h1 className="text-3xl text-center font-bold">{t("title")}</h1>
            </XSection>

            {posts.map((post, index) => (
                <XSection key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                        <div className="text-xs text-woodsmoke-500 dark:text-woodsmoke-300">
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            })}
                        </div>
                        <h3 className="leading-tight font-bold text-lg mt-2 mb-1">{post.title}</h3>
                        <div className="text-sm text-woodsmoke-600 dark:text-woodsmoke-300">{post.description}</div>
                    </Link>
                </XSection>
            ))}
        </>
    );
};

export default BlogTemplate;
