"use client";

import Link from "next/link";
import { IconLayoutGrid, IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

const containerVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.99 },
};

const arrowVariants = {
    rest: { x: 0, opacity: 0.45 },
    hover: { x: 4, opacity: 0.85 },
};

const iconVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.15, opacity: 1 },
};

const ProjectsCTA = () => {
    return (
        <div className="flex justify-center my-10">
            <Link href="/projects">
                <motion.span
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl md:text-lg font-medium
                               text-woodsmoke-800 dark:text-woodsmoke-100
                               bg-white dark:bg-woodsmoke-950
                               dark:hover:bg-woodsmoke-900
                               transition-colors
                               border border-woodsmoke-200 dark:border-woodsmoke-700
                               cursor-pointer select-none relative overflow-hidden"
                    variants={containerVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                    <motion.span variants={iconVariants} transition={{ duration: 0.2 }} className="inline-flex">
                        <IconLayoutGrid size={18} aria-hidden />
                    </motion.span>
                    Check out my projects
                    <motion.span
                        variants={arrowVariants}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                        className="inline-flex"
                    >
                        <IconArrowRight size={16} aria-hidden />
                    </motion.span>
                </motion.span>
            </Link>
        </div>
    );
};

export default ProjectsCTA;
