import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { getPosts } from "@lib/posts";
import { getFormatter, getTranslations } from "next-intl/server";

const BlogTemplate = async () => {
    const t = await getTranslations("home.blogs");
    const format = await getFormatter();
    const posts = getPosts();

    return (
        <>
            <XSection transparent>
                <h1 className="text-3xl text-center font-bold">{t("title")}</h1>
            </XSection>

            {posts.map((post) => (
                <XSection
                    key={post.slug}
                    containerClassname="transition-all hover:shadow-xl dark:hover:shadow-woodsmoke-900/40 hover:shadow-woodsmoke-300/30 hover:scale-[1.03] duration-300"
                >
                    <Link href={`/blog/${post.slug}`}>
                        <div className="text-xs text-woodsmoke-500 dark:text-woodsmoke-300">
                            {format.dateTime(new Date(post.date), {
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
