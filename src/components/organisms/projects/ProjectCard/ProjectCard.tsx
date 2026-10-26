"use client";

import XSection from "@atoms/XSection";
import Link from "next/link";
import { IconPhoto, IconWorld } from "@tabler/icons-react";
import { t } from "@lib/i18n";
import dynamic from "next/dynamic";
import { useState } from "react";

import type { Project } from "@core/data/PROJECTS";

// The lightbox is only needed after a click, so keep it out of the initial bundle.
const ProjectGallery = dynamic(() => import("@molecules/ProjectGallery/ProjectGallery"), { ssr: false });

const ProjectCard = ({ project }: { project: Project }) => {
    const translate = t("project-card");
    const [opened, setOpened] = useState(false);
    const [index, setIndex] = useState(0);

    const openGallery = () => {
        setIndex(0);
        setOpened(true);
    };

    return (
        <>
            <XSection>
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
                    <p className="text-woodsmoke-600 dark:text-woodsmoke-300 text-sm leading-relaxed">
                        {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                        {project.gallery.length > 0 && (
                            <button
                                type="button"
                                onClick={() => openGallery()}
                                className="inline-flex items-center text-xs text-woodsmoke-700 hover:text-blue-600 dark:text-woodsmoke-200 dark:hover:text-blue-400 transition cursor-pointer"
                                title={translate("view-gallery")}
                            >
                                <IconPhoto size={20} className="mr-1" />
                                {translate("gallery")} ({project.gallery.length})
                            </button>
                        )}
                        <Link
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-woodsmoke-700 hover:text-blue-600 dark:text-woodsmoke-200 dark:hover:text-blue-400 transition"
                            title={translate("open-website")}
                        >
                            <IconWorld size={20} className="mr-1" />
                            {translate("live-website")}
                        </Link>
                    </div>
                </div>
            </XSection>

            {opened && (
                <ProjectGallery
                    index={index}
                    slides={project.gallery.map((src) => ({ src }))}
                    onClose={() => setOpened(false)}
                    onIndexChange={setIndex}
                />
            )}
        </>
    );
};

export default ProjectCard;
