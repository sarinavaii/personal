"use client";

import XBadge from "@atoms/XBadge";
import XSection from "@atoms/XSection";
import XSegmentedControl from "@atoms/XSegmentedControl";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const About = () => {
    const t = useTranslations("home.about");
    const [segmentValue, setSegmentValue] = useState("experience");
    return (
        <>
            <XSection transparent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center">{t("title")}</h2>
                    <XSegmentedControl
                        fullWidth
                        value={segmentValue}
                        onChange={setSegmentValue}
                        color="woodsmoke"
                        classNames={{
                            root: "max-w-sm w-full mx-auto",
                        }}
                        data={[
                            {
                                label: t("experience"),
                                value: "experience",
                            },
                            {
                                label: t("education"),
                                value: "education",
                            },
                        ]}
                        size="md"
                        radius="md"
                    />
                </div>
            </XSection>
            {segmentValue === "education" && (
                <>
                    <XSection>
                        <div className="flex items-center justify-between">
                            <span className="font-bold">BS | Computer Engineering</span>
                            <span className="text-sm">University of Mazandaran | 2014 - 2019</span>
                        </div>
                    </XSection>
                    <XSection>
                        <div className="flex items-center justify-between">
                            <span className="font-bold">MS | Information Technology</span>
                            <span className="text-sm">Urmia University of Technology | 2019 - 2023</span>
                        </div>
                    </XSection>
                </>
            )}
            {segmentValue === "experience" && (
                <>
                    <XSection>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 font-bold">
                                <Image
                                    src="/images/overc.jpg"
                                    className="size-10 rounded-full"
                                    width={40}
                                    height={40}
                                    alt="overc"
                                />
                                OverC
                            </span>
                            <span className="text-sm">Part-time - Remote | Jan 2026 – Present</span>
                        </div>
                    </XSection>
                    <XSection transparent>
                        <XBadge size="lg">Senior Front-End Developer</XBadge>
                        <ul className="list-disc px-6 mt-4">
                            <li>
                                Designed and delivered high-performance dashboards for global and local clients,
                                managing complex data flows and multi-source integrations.
                            </li>
                            <li>
                                Architected scalable frontend solutions with Next.js and React, optimizing performance
                                through efficient data fetching, caching, and rendering strategies.
                            </li>
                        </ul>
                    </XSection>
                    <XSection>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 font-bold">
                                <Image
                                    src="/images/dornica.jpg"
                                    className="size-10 rounded-full"
                                    width={40}
                                    height={40}
                                    alt="dornica"
                                />
                                Dornica
                            </span>
                            <span className="text-sm">Full-time - On-site | June 2021 – Jan 2026</span>
                        </div>
                    </XSection>
                    <XSection transparent>
                        <XBadge size="lg">Front-End Tech Lead | Oct 2021 – Jan 2026</XBadge>
                        <ul className="list-disc px-6 my-4">
                            <li>
                                Defined organization-wide frontend standards (ESLint configs, Git workflows, component
                                patterns) adopted across all projects.
                            </li>
                            <li>
                                Architected and delivered Rasad System, a national-scale BI dashboard, achieving less
                                than 2s initial load time through Next.js SSR, React Query caching, and progressive
                                chart rendering for multi-source executive analytics.
                            </li>
                            <li>
                                Established component library with +10 reusable modules, cutting development time for
                                new dashboards.
                            </li>
                            <li>
                                Onboarded and mentored 10+ junior developers and interns through structured training
                                program, with 5+ promoted to mid-level roles.
                            </li>
                        </ul>
                        <XBadge size="lg">UI Designer & Front-End Developer | Jun 2021 – Oct 2021 </XBadge>
                        <ul className="list-disc px-6 mt-4">
                            <li>
                                Built 20+ responsive interfaces from design mockups using Bootstrap and JavaScript for
                                CMS platforms, internal dashboards, and specialized client websites.
                            </li>
                        </ul>
                    </XSection>
                    <XSection>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 font-bold">
                                <Image
                                    src="/images/platin.jpg"
                                    className="size-10 rounded-full"
                                    width={40}
                                    height={40}
                                    alt="platin"
                                />
                                Platin Agency
                            </span>
                            <span className="text-sm">Part-time - Remote | Dec 2023 – Dec 2025</span>
                        </div>
                    </XSection>
                    <XSection transparent>
                        <XBadge size="lg">Front-End Developer</XBadge>

                        <ul className="list-disc px-6 mt-4">
                            <li>
                                Sole frontend developer responsible for end-to-end implementation and delivery of client
                                web properties.
                            </li>
                            <li>Architected and deployed the main agency website with SEO optimization.</li>
                            <li>
                                Delivered multiple campaign websites for Nazari Cake, ensuring brand consistency and
                                mobile responsiveness
                            </li>
                        </ul>
                    </XSection>
                </>
            )}
        </>
    );
};

export default About;
