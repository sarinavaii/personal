"use client";

import Link from "next/link";
import { IconLayoutGrid, IconArrowRight } from "@tabler/icons-react";

const ProjectsCTA = () => {
    return (
        <div className="flex justify-center my-10">
            <Link href="/projects" className="group">
                <span
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl md:text-lg font-medium
                               text-woodsmoke-800 dark:text-woodsmoke-100
                               bg-white dark:bg-woodsmoke-950
                               dark:hover:bg-woodsmoke-900
                               transition duration-200 ease-out
                               border border-woodsmoke-200 dark:border-woodsmoke-700
                               cursor-pointer select-none relative overflow-hidden
                               group-hover:scale-[1.03] group-active:scale-[0.99]"
                >
                    <span className="inline-flex transition duration-200 ease-out opacity-70 group-hover:scale-110 group-hover:opacity-100">
                        <IconLayoutGrid size={18} aria-hidden />
                    </span>
                    Check out my projects
                    <span className="inline-flex translate-x-0 opacity-[0.45] transition duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-[0.85]">
                        <IconArrowRight size={16} aria-hidden />
                    </span>
                </span>
            </Link>
        </div>
    );
};

export default ProjectsCTA;
