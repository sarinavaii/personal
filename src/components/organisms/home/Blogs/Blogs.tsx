import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { getLatestPosts } from "@lib/posts";
import { IconArrowRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const Blogs = () => {
    const t = useTranslations("home.blogs");
    const posts = getLatestPosts(4);

    return (
        <XSection transparent withPadding={false}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <Link className="flex gap-1 items-center" href="/blog">
                    {t("view-all")}
                    <IconArrowRight size={24} />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                        <XSection containerClassname="h-full transition-all hover:shadow-xl dark:hover:shadow-woodsmoke-900/40 hover:shadow-woodsmoke-300/30 hover:scale-[1.03] duration-300">
                            <h3 className="leading-tight font-bold text-lg mb-2">{post.title}</h3>
                            <div className="text-sm text-woodsmoke-600 dark:text-woodsmoke-300">{post.description}</div>
                        </XSection>
                    </Link>
                ))}
            </div>
        </XSection>
    );
};

export default Blogs;
