import Image from "next/image";
import Link from "next/link";
import { IconArrowDown, IconBrandGithub, IconBrandLinkedin, IconMail, IconMapPin } from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

import ButtonLink from "@ui/ButtonLink";
import { t } from "@lib/i18n";

type ContactItem = {
    id: string;
    label: string;
    href: string;
};

type Fact = {
    value: string;
    label: string;
};

const SOCIAL_ICONS: Record<string, TablerIcon> = {
    email: IconMail,
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
};

const AboutHero = () => {
    const translate = t("about.hero");
    const common = t("common");
    const facts = translate.raw<Fact[]>("facts");
    const socials = t("contact")
        .raw<ContactItem[]>("items")
        .filter((item) => item.id in SOCIAL_ICONS);

    return (
        <section className="border-b border-border">
            <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
                <div className="reveal min-w-0">
                    <p className="flex items-center gap-2.5">
                        <span className="status-dot" aria-hidden />
                        <span className="eyebrow">{translate("availability")}</span>
                    </p>

                    <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-strong sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                        {translate("title")}
                    </h1>

                    <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
                        <p>{translate("intro-1")}</p>
                        <p>{translate("intro-2")}</p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <ButtonLink href="#experience">
                            {translate("cta-experience")}
                            <IconArrowDown size={15} aria-hidden />
                        </ButtonLink>
                        <ButtonLink href="/contact" variant="secondary">
                            {translate("cta-contact")}
                        </ButtonLink>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-6 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5">
                            <IconMapPin size={14} className="text-faint" aria-hidden />
                            {translate("location")}
                        </span>
                        <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
                        <span>{translate("role")}</span>

                        <div className="ml-auto flex items-center gap-1">
                            {socials.map(({ id, label, href }) => {
                                const Icon = SOCIAL_ICONS[id];

                                return (
                                    <Link
                                        key={id}
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        aria-label={label}
                                        className="grid size-8 place-items-center rounded-md text-faint transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface hover:text-foreground"
                                    >
                                        <Icon size={16} aria-hidden />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="reveal reveal-2 min-w-0">
                    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
                        <div
                            className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent-soft blur-3xl"
                            aria-hidden
                        />
                        <Image
                            src="/images/profile.jpg"
                            alt={common("site-name")}
                            width={720}
                            height={720}
                            priority
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="relative aspect-square w-full object-cover"
                        />
                        <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/10 bg-black/65 p-4 backdrop-blur-md">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                                {translate("based")}
                            </p>
                            <p className="mt-1 text-sm font-medium text-white">{translate("based-value")}</p>
                        </div>
                    </div>

                    <dl className="mt-3 grid grid-cols-3 gap-2">
                        {facts.map((fact) => (
                            <div
                                key={fact.label}
                                className="rounded-lg border border-border bg-surface px-3 py-4 text-center"
                            >
                                <dd className="text-xl font-semibold tracking-tight text-strong">{fact.value}</dd>
                                <dt className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                                    {fact.label}
                                </dt>
                            </div>
                        ))}
                    </dl>

                    <p className="mt-3 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                        {translate("facts-note")}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
