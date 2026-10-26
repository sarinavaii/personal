import Badge from "@ui/Badge";
import { t } from "@lib/i18n";

const ProjectsIntro = () => {
    const translate = t("projects");
    const focus = translate.raw<string[]>("focus");

    return (
        <section className="border-b border-border">
            <div className="container-page py-16 lg:py-24">
                <p className="eyebrow">{translate("eyebrow")}</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-strong sm:text-5xl">
                    {translate("title")}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                    {translate("description")}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                    {focus.map((item) => (
                        <Badge key={item}>{item}</Badge>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsIntro;
