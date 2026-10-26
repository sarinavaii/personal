import Link from "next/link";
import { IconArrowUpRight, IconBrandLinkedin } from "@tabler/icons-react";

import SectionHeading from "@ui/SectionHeading";
import { t } from "@lib/i18n";

type Recommendation = {
    name: string;
    role: string;
    quote: string;
};

type ContactItem = {
    id: string;
    href: string;
};

function initials(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

const Recommendations = () => {
    const translate = t("about.recommendations");
    const items = translate.raw<Recommendation[]>("items");
    const linkedin = t("contact")
        .raw<ContactItem[]>("items")
        .find((item) => item.id === "linkedin");

    return (
        <section className="border-b border-border">
            <div className="container-page py-16 lg:py-20">
                <SectionHeading
                    eyebrow={translate("eyebrow")}
                    title={translate("title")}
                    description={translate("description")}
                    className="mb-10"
                    action={
                        linkedin ? (
                            <Link
                                href={linkedin.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                            >
                                <IconBrandLinkedin size={15} aria-hidden />
                                {translate("linkedin")}
                                <IconArrowUpRight
                                    size={14}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    aria-hidden
                                />
                            </Link>
                        ) : null
                    }
                />

                <div className="grid gap-5 md:grid-cols-2">
                    {items.map((item) => (
                        <figure
                            key={item.name}
                            className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
                        >
                            <span className="font-serif text-6xl leading-[0.7] text-border-strong" aria-hidden>
                                “
                            </span>
                            <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
                                {item.quote}
                            </blockquote>
                            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-background font-mono text-[11px] font-semibold text-muted">
                                    {initials(item.name)}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-sm font-medium text-strong">{item.name}</span>
                                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                                        {item.role}
                                    </span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{translate("note")}</p>
            </div>
        </section>
    );
};

export default Recommendations;
