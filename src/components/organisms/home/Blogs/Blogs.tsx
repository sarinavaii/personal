import Section from "@atoms/Section";
import { Link } from "@i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Blogs = () => {
    const t = useTranslations("home.blogs");
    return (
        <Section transparent>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <Link href="/blogs">{t("view-all")}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index}>
                        <Section className="flex flex-col gap-4">
                            <Image
                                unoptimized
                                src="https://placehold.co/600x400/999999/FFFFFF/png"
                                alt="img"
                                width={600}
                                height={400}
                                className="rounded-lg"
                            />
                            <h3 className="leading-tight">۱۰ نکته مهم برای توسعه فرانت اند – راهنمای کاربردی</h3>
                        </Section>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Blogs;
