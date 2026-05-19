import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { IconCarouselHorizontal, IconTable, IconWorld } from "@tabler/icons-react";
import Image from "next/image";

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
                <XSection>
                    <div className="flex items-center gap-4">
                        <Image
                            width={80}
                            height={80}
                            src="/images/sample-project.jpg"
                            alt="Sample Project"
                            className="w-20 h-20 rounded-lg object-cover border border-woodsmoke-200 dark:border-woodsmoke-800"
                        />
                        <div>
                            <h2 className="text-xl font-semibold mb-1">Sample Project Title</h2>
                            <p className="text-woodsmoke-600 dark:text-woodsmoke-300 text-sm">
                                This is a brief description of a sample project. Showcase your project’s purpose and its
                                main features here to give visitors a quick understanding of what it’s about.
                            </p>
                            <div className="mt-2 flex gap-3">
                                <Link
                                    href="https://your-live-preview-link.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-woodsmoke-700 hover:text-blue-600 dark:text-woodsmoke-200 dark:hover:text-blue-400 transition"
                                    title="Preview"
                                >
                                    <IconCarouselHorizontal size={24} className="mr-1" />
                                    Preview
                                </Link>
                                <Link
                                    href="https://your-live-preview-link.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-woodsmoke-700 hover:text-blue-600 dark:text-woodsmoke-200 dark:hover:text-blue-400 transition"
                                    title="Open Live Website"
                                >
                                    <IconWorld size={24} className="mr-1" />
                                    Live Website
                                </Link>
                            </div>
                        </div>
                    </div>
                </XSection>
            </div>
        </>
    );
};

export default ProjectsTemplate;
