import XSection from "@atoms/XSection";
import Link from "next/link";
import { getPosts } from "@lib/posts";
import { formatDate, t } from "@lib/i18n";

const BlogTemplate = () => {
    const translate = t("home.blogs");
    const posts = getPosts();

    return (
        <>
            <XSection transparent>
                <h1 className="text-3xl text-center font-bold">{translate("title")}</h1>
            </XSection>

            {posts.map((post) => (
                <XSection
                    key={post.slug}
                    containerClassname="transition-all hover:shadow-xl dark:hover:shadow-woodsmoke-900/40 hover:shadow-woodsmoke-300/30 hover:scale-[1.03] duration-300"
                >
                    <Link href={`/blog/${post.slug}`}>
                        <div className="text-xs text-woodsmoke-500 dark:text-woodsmoke-300">
                            {formatDate(post.date, {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            })}
                        </div>
                        <h2 className="leading-tight font-bold text-lg mt-2 mb-1">{post.title}</h2>
                        <div className="text-sm text-woodsmoke-600 dark:text-woodsmoke-300">{post.description}</div>
                    </Link>
                </XSection>
            ))}
        </>
    );
};

export default BlogTemplate;
