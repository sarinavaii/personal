import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

import { CONTACT_ICONS, type ContactItem } from "@core/data/CONTACT";
import { t } from "@lib/i18n";

const ContactTemplate = () => {
    const translate = t("contact");
    const items = translate.raw<ContactItem[]>("items");

    return (
        <>
            <section className="border-b border-border">
                <div className="container-page py-16 lg:py-24">
                    <p className="eyebrow">{translate("eyebrow")}</p>
                    <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-strong sm:text-5xl">
                        {translate("intro-heading")}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                        {translate("intro-description")}
                    </p>
                </div>
            </section>

            <section className="container-page py-14" aria-label="Contact methods">
                <div className="grid gap-4 sm:grid-cols-2">
                    {items.map(({ id, label, value, href }) => {
                        const Icon = CONTACT_ICONS[id];
                        const isExternal = href.startsWith("http");
                        const ArrowIcon = isExternal ? IconArrowUpRight : IconArrowRight;

                        return (
                            <Link
                                key={id}
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
                            >
                                <span className="flex items-start gap-3.5">
                                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-background text-muted transition-colors group-hover:text-foreground">
                                        {Icon ? <Icon size={16} aria-hidden /> : null}
                                    </span>
                                    <span>
                                        <span className="eyebrow block">{label}</span>
                                        <span className="mt-2 block break-all text-sm font-medium text-foreground">
                                            {value}
                                        </span>
                                    </span>
                                </span>
                                <ArrowIcon
                                    size={15}
                                    className="mt-1 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                                    aria-hidden
                                />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default ContactTemplate;
