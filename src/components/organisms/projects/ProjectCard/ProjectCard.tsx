"use client";

import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { IconPhoto, IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import type { Project } from "@core/data/PROJECTS";

const ProjectCard = ({ project }: { project: Project }) => {
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
                                title="View Gallery"
                            >
                                <IconPhoto size={20} className="mr-1" />
                                Gallery ({project.gallery.length})
                            </button>
                        )}
                        <Link
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-woodsmoke-700 hover:text-blue-600 dark:text-woodsmoke-200 dark:hover:text-blue-400 transition"
                            title="Open Live Website"
                        >
                            <IconWorld size={20} className="mr-1" />
                            Live Website
                        </Link>
                    </div>
                </div>
            </XSection>

            <Lightbox
                open={opened}
                close={() => setOpened(false)}
                index={index}
                slides={project.gallery.map((src) => ({ src }))}
                plugins={[Zoom, Fullscreen]}
                carousel={{ finite: false }}
                controller={{ closeOnBackdropClick: true }}
                on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
            />
        </>
    );
};

export default ProjectCard;
