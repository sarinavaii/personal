import XBadge from "@atoms/XBadge";
import XSection from "@atoms/XSection";
import Link from "next/link";
import ContentFormatter from "@molecules/ContentFormatter/ContentFormatter";
import { formatDate, t } from "@lib/i18n";

type BlogPost = {
    slug: string;
    title: string;
    content: string;
    description: string;
    date: string;
    published: boolean;
    tags: string[];
};

type Props = {
    post: BlogPost;
    prevPost: BlogPost | null;
    nextPost: BlogPost | null;
};

const BlogDetailsTemplate = ({ post, prevPost, nextPost }: Props) => {
    const translate = t("home.blogs");

    return (
        <XSection transparent withPadding={false} containerClassname="!mb-0">
            <article>
                <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                <div className="text-sm text-woodsmoke-500 text-center">
                    {formatDate(post.date, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                <ContentFormatter>{post.content}</ContentFormatter>
                <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag: string) => (
                        <XBadge size="sm" key={tag}>
                            {tag}
                        </XBadge>
                    ))}
                </div>
            </article>

            {/* Prev / Next navigation */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <div>
                    {prevPost && (
                        <Link href={`/blog/${prevPost.slug}`}>
                            <XSection className="group flex flex-col gap-1">
                                <span className="text-xs text-woodsmoke-400 uppercase tracking-wide">
                                    <span className="inline-block">←</span> {translate("newer")}
                                </span>
                                <span className="text-sm font-semibold">{prevPost.title}</span>
                            </XSection>
                        </Link>
                    )}
                </div>
                <div>
                    {nextPost && (
                        <Link href={`/blog/${nextPost.slug}`}>
                            <XSection className="group flex flex-col gap-1 justify-end text-end">
                                <span className="text-xs text-woodsmoke-400 uppercase tracking-wide">
                                    {translate("older")} <span className="inline-block">→</span>
                                </span>
                                <span className="text-sm font-semibold">{nextPost.title}</span>
                            </XSection>
                        </Link>
                    )}
                </div>
            </div>

            <div className="text-center mt-8">
                <Link className="text-xl font-bold" href="/blog">
                    {translate("back")}
                </Link>
            </div>
        </XSection>
    );
};

export default BlogDetailsTemplate;
