"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@core/utils";
import { t } from "@lib/i18n";

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

const EXPERIENCE_KEYS = ["cyberno", "overc", "dornica", "platin"] as const;

const EXPERIENCE_IMAGES: Record<(typeof EXPERIENCE_KEYS)[number], string> = {
    cyberno: "/images/cyberno-mark.png",
    overc: "/images/overc.jpg",
    dornica: "/images/dornica.jpg",
    platin: "/images/platin.jpg",
};

const About = () => {
    const translate = t("home.about");
    const [tab, setTab] = useState<"experience" | "education">("experience");
    const educationItems = translate.raw<EducationItem[]>("educationItems");

    const tabs = [
        { id: "experience", label: translate("experience") },
        { id: "education", label: translate("education") },
    ] as const;

    return (
        <section className="border-b border-border">
            <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <p className="eyebrow">{translate("eyebrow")}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-strong sm:text-3xl">{translate("title")}</h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{translate("description")}</p>

                    <div
                        role="tablist"
                        aria-label={translate("title")}
                        className="mt-8 inline-flex rounded-lg border border-border bg-surface p-1"
                    >
                        {tabs.map((item) => (
                            <button
                                key={item.id}
                                role="tab"
                                type="button"
                                id={`about-tab-${item.id}`}
                                aria-selected={tab === item.id}
                                aria-controls={`about-panel-${item.id}`}
                                onClick={() => setTab(item.id)}
                                className={cn(
                                    "rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                                    tab === item.id ? "bg-background text-strong" : "text-muted hover:text-foreground",
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    {tab === "experience" ? (
                        <div
                            key="experience"
                            role="tabpanel"
                            id="about-panel-experience"
                            aria-labelledby="about-tab-experience"
                            className="tab-panel relative"
                        >
                            {EXPERIENCE_KEYS.map((key) => {
                                const entry = translate.raw<ExperienceEntry>(key);

                                return (
                                    <div key={key} className="relative border-l border-border pb-10 pl-6 last:pb-0">
                                        <span
                                            className="absolute -left-[4.5px] top-1.5 size-2 rounded-full border border-background bg-border-strong"
                                            aria-hidden
                                        />
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <Image
                                                src={EXPERIENCE_IMAGES[key]}
                                                alt=""
                                                width={28}
                                                height={28}
                                                className="size-7 rounded-md border border-border object-cover"
                                            />
                                            <h3 className="font-medium text-strong">{entry.company}</h3>
                                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                                                {entry.period}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-5">
                                            {entry.positions.map((position) => (
                                                <div key={position.title}>
                                                    <p className="text-sm font-medium text-foreground">
                                                        {position.title}
                                                    </p>
                                                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-border-strong">
                                                        {position.highlights.map((highlight) => (
                                                            <li key={highlight}>{highlight}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div
                            key="education"
                            role="tabpanel"
                            id="about-panel-education"
                            aria-labelledby="about-tab-education"
                            className="tab-panel flex flex-col gap-4"
                        >
                            {educationItems.map((item) => {
                                const [institution, period] = item.institution.split("|").map((part) => part.trim());

                                return (
                                    <div key={item.degree} className="rounded-xl border border-border bg-surface p-5">
                                        <h3 className="font-medium text-strong">{item.degree}</h3>
                                        <p className="mt-1 text-sm text-muted">{institution}</p>
                                        {period ? (
                                            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                                                {period}
                                            </p>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;
