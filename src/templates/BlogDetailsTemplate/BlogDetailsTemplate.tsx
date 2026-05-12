import XBadge from "@atoms/XBadge";
import XSection from "@atoms/XSection";
import ContentFormatter from "@molecules/ContentFormatter/ContentFormatter";

type BlogPost = {
    slug: string;
    title: string;
    content: string;
    description: string;
    date: string;
    published: boolean;
    tags: string[];
};

const BlogDetailsTemplate = ({ post }: { post: BlogPost }) => {
    return (
        <XSection transparent withPadding={false}>
            <article>
                <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                <div className="text-sm text-woodsmoke-500 text-center">
                    {new Date(post.date).toLocaleDateString("en-US", {
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
        </XSection>
    );
};

export default BlogDetailsTemplate;
