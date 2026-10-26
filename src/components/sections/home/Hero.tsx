import Image from "next/image";
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

import ButtonLink from "@ui/ButtonLink";
import { t } from "@lib/i18n";

type ContactItem = {
    id: string;
    label: string;
    href: string;
};

const SOCIAL_ICONS: Record<string, TablerIcon> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
};

const Hero = () => {
    const translate = t("home.hero");
    const common = t("common");
    const socials = t("contact")
        .raw<ContactItem[]>("items")
        .filter((item) => item.id in SOCIAL_ICONS);

    return (
        <section className="border-b border-border">
            <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
                <div className="reveal min-w-0">
                    <p className="flex items-center gap-2.5">
                        <span className="status-dot" aria-hidden />
                        <span className="eyebrow">{translate("status")}</span>
                    </p>

                    <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-strong sm:text-5xl lg:text-7xl lg:leading-[1.02] lg:tracking-[-0.055em]">
                        {translate("tagline-1")}
                        <span className="mt-2 block text-muted">{translate("tagline-2")}</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                        {translate("description")}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <ButtonLink href="/projects">
                            {translate("cta-projects")}
                            <IconArrowRight size={15} aria-hidden />
                        </ButtonLink>
                        <ButtonLink href="/blog" variant="secondary">
                            {translate("cta-articles")}
                        </ButtonLink>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-border pt-6">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/profile.jpg"
                                alt={common("site-name")}
                                width={40}
                                height={40}
                                className="size-10 rounded-full border border-border object-cover"
                                priority
                            />
                            <div>
                                <p className="text-sm font-medium text-foreground">{common("site-name")}</p>
                                <p className="font-mono text-[11px] text-faint">{translate("location")}</p>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center gap-1">
                            {socials.map(({ id, label, href }) => {
                                const Icon = SOCIAL_ICONS[id];

                                return (
                                    <a
                                        key={id}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="grid size-8 place-items-center rounded-md text-faint transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface hover:text-foreground"
                                    >
                                        <Icon size={16} aria-hidden />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <p className="eyebrow mt-5">{translate("stack")}</p>
                </div>

                <div className="reveal reveal-2 min-w-0">
                    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong">
                        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                            <span className="size-2.5 rounded-full bg-border-strong" aria-hidden />
                            <span className="size-2.5 rounded-full bg-border-strong" aria-hidden />
                            <span className="size-2.5 rounded-full bg-border-strong" aria-hidden />
                            <span className="ml-2 font-mono text-[11px] text-faint">~/salar — profile.ts</span>
                        </div>

                        <pre className="w-full overflow-x-auto px-5 py-6 font-mono text-[11.5px] leading-7 text-muted sm:text-[12.5px]">
                            <code aria-label="Developer profile code sample">
                                <span className="block">
                                    <span className="text-accent">const</span>{" "}
                                    <span className="text-strong">developer</span> = {"{"}
                                </span>
                                <span className="block pl-5">
                                    name: <span className="text-strong">&quot;Salar Sari Navaii&quot;</span>,
                                </span>
                                <span className="block pl-5">
                                    role: <span className="text-strong">&quot;Senior Front-end Developer&quot;</span>,
                                </span>
                                <span className="block pl-5">stack: [</span>
                                <span className="block pl-10">
                                    <span className="text-strong">&quot;React&quot;</span>,{" "}
                                    <span className="text-strong">&quot;Next.js&quot;</span>,{" "}
                                    <span className="text-strong">&quot;TypeScript&quot;</span>,
                                </span>
                                <span className="block pl-5">],</span>
                                <span className="block pl-5">
                                    focus: <span className="text-strong">&quot;performance &amp; data viz&quot;</span>,
                                </span>
                                <span className="block pl-5">
                                    location: <span className="text-strong">&quot;Remote&quot;</span>,
                                </span>
                                <span className="block">{"};"}</span>
                                <span className="mt-3 block text-faint">{"// currently building at Cyberno"}</span>
                            </code>
                        </pre>

                        <div className="flex items-center justify-between border-t border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                            <span>TypeScript</span>
                            <span>UTF-8</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
