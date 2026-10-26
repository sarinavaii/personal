"use client";

import XBadge from "@atoms/XBadge";
import XSection from "@atoms/XSection";
import XSegmentedControl from "@atoms/XSegmentedControl";
import { t } from "@lib/i18n";
import Image from "next/image";
import { useState } from "react";

type EducationItem = {
    degree: string;
    institution: string;
};

type Position = {
    title: string;
    highlights: string[];
};

type ExperienceEntry = {
    company: string;
    period: string;
    positions: Position[];
};

const EXPERIENCE_KEYS = ["overc", "dornica", "platin"] as const;
const EXPERIENCE_IMAGES: Record<(typeof EXPERIENCE_KEYS)[number], { src: string; alt: string }> = {
    overc: { src: "/images/overc.jpg", alt: "overc" },
    dornica: { src: "/images/dornica.jpg", alt: "dornica" },
    platin: { src: "/images/platin.jpg", alt: "platin" },
};

const About = () => {
    const translate = t("home.about");
    const [segmentValue, setSegmentValue] = useState("experience");
    const educationItems = translate.raw("educationItems") as EducationItem[];

    return (
        <>
            <XSection transparent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center">{translate("title")}</h2>
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
                                label: translate("experience"),
                                value: "experience",
                            },
                            {
                                label: translate("education"),
                                value: "education",
                            },
                        ]}
                        size="lg"
                        radius="12"
                    />
                </div>
            </XSection>
            {segmentValue === "education" &&
                educationItems.map((item) => (
                    <XSection key={item.degree}>
                        <div className="flex items-center justify-between">
                            <span className="font-bold">{item.degree}</span>
                            <span className="text-sm">{item.institution}</span>
                        </div>
                    </XSection>
                ))}
            {segmentValue === "experience" &&
                EXPERIENCE_KEYS.map((key) => {
                    const entry = translate.raw(key) as ExperienceEntry;
                    const image = EXPERIENCE_IMAGES[key];
                    const hasMultiplePositions = entry.positions.length > 1;

                    return (
                        <div key={key}>
                            <XSection>
                                <div className="flex gap-1 sm:items-center justify-between max-sm:flex-col">
                                    <span className="flex items-center gap-2 font-bold">
                                        <Image
                                            src={image.src}
                                            className="size-10 rounded-full"
                                            width={40}
                                            height={40}
                                            alt={image.alt}
                                        />
                                        {entry.company}
                                    </span>
                                    <span className="text-sm max-sm:text-end">{entry.period}</span>
                                </div>
                            </XSection>
                            <XSection transparent>
                                {entry.positions.map((position, positionIndex) => (
                                    <div key={position.title}>
                                        <XBadge size="lg">{position.title}</XBadge>
                                        <ul
                                            className={
                                                hasMultiplePositions && positionIndex === 0
                                                    ? "list-disc px-6 my-4"
                                                    : "list-disc px-6 mt-4"
                                            }
                                        >
                                            {position.highlights.map((highlight) => (
                                                <li key={highlight}>{highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </XSection>
                        </div>
                    );
                })}
        </>
    );
};

export default About;
