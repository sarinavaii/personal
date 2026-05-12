import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { getPosts } from "@lib/posts";
import { useTranslations } from "next-intl";

const Blogs = () => {
    const t = useTranslations("home.blogs");
    const posts = getPosts();

    return (
        <XSection transparent withPadding={false}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <Link href="/blog">{t("view-all")}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                        <XSection containerClassname="h-full">
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
