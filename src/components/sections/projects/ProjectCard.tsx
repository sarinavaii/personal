"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { IconArrowUpRight, IconPhoto, IconWorld } from "@tabler/icons-react";

import type { Project } from "@core/data/PROJECTS";
import ProjectCover from "@ui/ProjectCover";
import { t } from "@lib/i18n";

// The lightbox is only needed after a click, so keep it out of the initial bundle.
const ProjectGallery = dynamic(() => import("@ui/ProjectGallery"), { ssr: false });

const ProjectCard = ({ project }: { project: Project }) => {
    const translate = t("project-card");
    const [opened, setOpened] = useState(false);
    const [index, setIndex] = useState(0);
    const hasGallery = project.gallery.length > 0;

    const openGallery = () => {
        setIndex(0);
        setOpened(true);
    };

    return (
        <>
            <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
                {hasGallery ? (
                    <button
                        type="button"
                        onClick={openGallery}
                        aria-label={`${translate("view-gallery")} — ${project.title}`}
                        className="relative block w-full overflow-hidden text-left"
                    >
                        <ProjectCover project={project} />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                            <IconPhoto size={12} aria-hidden />
                            {translate("gallery")} ({project.gallery.length})
                        </span>
                    </button>
                ) : (
                    <ProjectCover project={project} />
                )}

                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                        <h2 className="text-lg font-semibold text-strong">{project.title}</h2>
                        <Link
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${translate("open-website")} — ${project.title}`}
                            className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 hover:border-border-strong hover:text-foreground"
                        >
                            <IconArrowUpRight size={14} aria-hidden />
                        </Link>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                        <Link
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
                        >
                            <IconWorld size={14} aria-hidden />
                            {translate("live-website")}
                        </Link>
                        {hasGallery ? (
                            <button
                                type="button"
                                onClick={openGallery}
                                className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
                            >
                                <IconPhoto size={14} aria-hidden />
                                {translate("gallery")}
                            </button>
                        ) : null}
                    </div>
                </div>
            </article>

            {opened ? (
                <ProjectGallery
                    index={index}
                    slides={project.gallery.map((src, galleryIndex) => ({
                        src,
                        alt: `${project.title} screenshot ${galleryIndex + 1}`,
                    }))}
                    onClose={() => setOpened(false)}
                    onIndexChange={setIndex}
                />
            ) : null}
        </>
    );
};

export default ProjectCard;
