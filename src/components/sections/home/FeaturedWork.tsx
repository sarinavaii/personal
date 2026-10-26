import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

import SectionHeading from "@ui/SectionHeading";
import ProjectCover from "@ui/ProjectCover";
import { PROJECTS } from "@core/data/PROJECTS";
import { t } from "@lib/i18n";

const FEATURED = PROJECTS.slice(0, 3);

const FeaturedWork = () => {
    const translate = t("home.work");

    return (
        <section className="border-b border-border">
            <div className="container-page py-16 lg:py-20">
                <SectionHeading
                    eyebrow={translate("eyebrow")}
                    title={translate("title")}
                    description={translate("description")}
                    className="mb-10"
                    action={
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                        >
                            {translate("view-all")}
                            <IconArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                    }
                />

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {FEATURED.map((project) => (
                        <Link
                            key={project.title}
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
                        >
                            <ProjectCover project={project} />
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-semibold text-strong">{project.title}</h3>
                                    <IconArrowUpRight
                                        size={15}
                                        className="mt-0.5 shrink-0 text-faint transition-colors group-hover:text-foreground"
                                        aria-hidden
                                    />
                                </div>
                                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;
