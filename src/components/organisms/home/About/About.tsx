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
                        transitionDuration={500}
                        fullWidth
                        value={segmentValue}
                        onChange={setSegmentValue}
                        color="woodsmoke"
                        classNames={{
                            root: "max-w-[300px] w-full mx-auto border border-woodsmoke-200 dark:border-woodsmoke-900",
                            innerLabel: "text-sm",
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
                        size="lg"
                        radius="12"
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
                        <div className="flex gap-1 sm:items-center justify-between max-sm:flex-col">
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
                            <span className="text-sm max-sm:text-end">Part-time - Remote | Jan 2026 – Present</span>
                        </div>
                    </XSection>
                    <XSection transparent>
                        <XBadge size="lg">Senior Front-End Developer</XBadge>
                        <ul className="list-disc px-6 mt-4">
                            <li>
                                Designed and delivered high-performance, multi-source BI dashboards for global and local
                                clients using Next.js, Recharts, and Highcharts, supporting complex real-time data flows
                                across 5+ integrated sources.
                            </li>
                            <li>
                                Architected frontend solutions with SSR, TanStack Query caching, and lazy loading
                                strategies, targeting sub-2s load times and measurable Core Web Vitals improvements
                                across all client deliverables.
                            </li>
                            <li>
                                Implemented i18next-based internationalization with full RTL support, enabling product
                                delivery to both Persian and English-speaking markets from a single codebase.
                            </li>
                        </ul>
                    </XSection>
                    <XSection>
                        <div className="flex gap-1 sm:items-center justify-between max-sm:flex-col">
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
                            <span className="text-sm max-sm:text-end">Full-time - On-site | Jun 2021 – Jan 2026</span>
                        </div>
                    </XSection>
                    <XSection transparent>
                        <XBadge size="lg">Front-End Tech Lead | Oct 2021 – Jan 2026</XBadge>
                        <ul className="list-disc px-6 my-4">
                            <li>
                                Defined and enforced organization-wide frontend standards — including ESLint configs,
                                Prettier, Husky Git hooks, branching workflows, and component patterns — adopted across
                                all projects and CI/CD pipelines.
                            </li>
                            <li>
                                Architected a national-scale executive BI dashboard integrating multiple REST APIs —
                                featuring KPI cards, geo maps, filterable tables, and Recharts visualizations; achieved
                                &lt;2s load time via Next.js SSR and TanStack Query caching.
                            </li>
                            <li>
                                Established a component library with 10+ reusable modules built with Mantine and React,
                                reducing estimated development time for new dashboards by ~30%.
                            </li>
                            <li>
                                Migrated UI styling approach from Bootstrap to Tailwind CSS across new projects,
                                standardizing design tokens and reducing custom CSS overhead.
                            </li>
                            <li>
                                Onboarded and mentored 10+ junior developers and interns through a structured 3-month
                                training program covering HTML, CSS, SCSS, Bootstrap, JavaScript, and jQuery, with 5+
                                promoted to mid-level roles.
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
                        <div className="flex gap-1 sm:items-center justify-between max-sm:flex-col">
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
                            <span className="text-sm max-sm:text-end">Part-time - Remote | Dec 2023 – Dec 2025</span>
                        </div>
                    </XSection>
                    <XSection transparent>
                        <XBadge size="lg">Front-End Developer</XBadge>

                        <ul className="list-disc px-6 mt-4">
                            <li>
                                Independently led frontend development for end-to-end implementation and successful
                                delivery of diverse client web solutions.
                            </li>
                            <li>
                                Designed and launched the agency&apos;s flagship website, prioritizing SEO best
                                practices and performance optimization.
                            </li>
                            <li>
                                Developed and shipped multiple campaign microsites for Nazari Cake, maintaining cohesive
                                brand identity and seamless mobile experiences.
                            </li>
                        </ul>
                    </XSection>
                </>
            )}
        </>
    );
};

export default About;
