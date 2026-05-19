"use client";

import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { IconChevronLeft, IconChevronRight, IconPhoto, IconWorld, IconX } from "@tabler/icons-react";
import { Modal } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";

type GalleryImage = {
    src: string;
    title: string;
};

type Project = {
    title: string;
    description: string;
    website: string;
    gallery: GalleryImage[];
};

const projects: Project[] = [
    {
        title: "Empire Club of Canada",
        description:
            "Built a member platform for one of Canada's oldest and most distinguished speakers' forums, enabling members to renew memberships, access exclusive information, and purchase or reserve event tickets.",
        website: "https://empireclubofcanada.com/",
        gallery: [
            {
                src: "/images/projects/empireclub/empire (2).webp",
                title: "Login Page",
            },
            {
                src: "/images/projects/empireclub/empire (3).webp",
                title: "Member Dashboard",
            },
            {
                src: "/images/projects/empireclub/empire (4).webp",
                title: "Membership Plans",
            },
            {
                src: "/images/projects/empireclub/empire (1).webp",
                title: "Event Detail Page",
            },
        ],
    },
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -80 : 80,
        opacity: 0,
    }),
};

const GalleryModal = ({
    images,
    opened,
    onClose,
}: {
    images: GalleryImage[];
    opened: boolean;
    onClose: () => void;
}) => {
    const [[current, direction], setPage] = useState([0, 0]);

    const paginate = useCallback(
        (newDirection: number) => {
            const next = (current + newDirection + images.length) % images.length;
            setPage([next, newDirection]);
        },
        [current, images.length],
    );

    const image = images[current];

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            centered
            padding={0}
            withCloseButton={false}
            styles={{
                content: {
                    background: "transparent",
                    boxShadow: "none",
                    overflow: "visible",
                },
                overlay: {
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(0,0,0,0.75)",
                },
                body: { padding: 0 },
            }}
        >
            <div className="relative flex flex-col items-center">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 z-50 text-white/70 hover:text-white transition"
                    aria-label="Close gallery"
                >
                    <IconX size={28} />
                </button>

                {/* Image frame */}
                <div
                    className="relative w-full overflow-hidden rounded-xl bg-woodsmoke-950"
                    style={{ aspectRatio: "16/9" }}
                >
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={image.src}
                                alt={image.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 80vw"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Prev / Next */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => paginate(-1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition"
                                aria-label="Previous image"
                            >
                                <IconChevronLeft size={22} />
                            </button>
                            <button
                                onClick={() => paginate(1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition"
                                aria-label="Next image"
                            >
                                <IconChevronRight size={22} />
                            </button>
                        </>
                    )}
                </div>

                {/* Caption */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`caption-${current}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-center px-4"
                    >
                        {image.title && <p className="text-white font-semibold text-sm">{image.title}</p>}
                    </motion.div>
                </AnimatePresence>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setPage([i, i > current ? 1 : -1])}
                                className={`relative w-14 h-10 rounded overflow-hidden border-2 transition ${
                                    i === current ? "border-blue-500" : "border-transparent opacity-50 hover:opacity-80"
                                }`}
                                aria-label={`Go to image ${i + 1}`}
                            >
                                <Image src={img.src} alt={img.title} fill className="object-cover" sizes="56px" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Counter */}
                <p className="text-white/40 text-xs mt-2">
                    {current + 1} / {images.length}
                </p>
            </div>
        </Modal>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    const [opened, setOpened] = useState(false);

    const openGallery = () => {
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

            <GalleryModal images={project.gallery} opened={opened} onClose={() => setOpened(false)} />
        </>
    );
};

const ProjectsTemplate = () => {
    return (
        <>
            <XSection transparent>
                <h1 className="text-3xl text-center font-bold mb-6">My Projects</h1>
                <div className="text-base text-woodsmoke-700 dark:text-woodsmoke-200">
                    <p>
                        Over the years, I have had the <b>privilege</b> of contributing to a{" "}
                        <b>diverse range of projects</b> that have challenged and enriched my skills as a developer. My
                        experience spans across:
                    </p>
                    <ul className="list-disc pl-6 my-4 space-y-1">
                        <li>
                            <b className="text-woodsmoke-900 dark:text-woodsmoke-100">Nationwide platforms</b>{" "}
                            supporting <b>10,000+ users</b>, focusing on <b>scalability</b> and{" "}
                            <b>robust performance</b>
                        </li>
                        <li>
                            <b className="text-woodsmoke-900 dark:text-woodsmoke-100">
                                Private Business Intelligence (BI) dashboards
                            </b>{" "}
                            for <b>governmental institutes</b>, emphasizing <b>data security</b> and{" "}
                            <b>insightful analytics</b>
                        </li>
                        <li>
                            <b className="text-woodsmoke-900 dark:text-woodsmoke-100">
                                Public-facing customer websites
                            </b>{" "}
                            where <b>UI/UX</b>, <b>performance</b>, and <b>accessibility</b> were top priorities
                        </li>
                    </ul>
                    <p>
                        <b className="text-woodsmoke-900 dark:text-woodsmoke-100">Key lessons</b> gained from these
                        projects include the importance of <span className="font-semibold">scalable design</span>,{" "}
                        <span className="font-semibold">clear communication</span>, and always prioritizing the{" "}
                        <span className="font-semibold">end-user experience</span>.
                    </p>
                </div>
            </XSection>

            <div className="flex flex-col gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </>
    );
};

export default ProjectsTemplate;
