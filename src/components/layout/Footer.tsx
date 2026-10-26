import Link from "next/link";
import { IconArrowUpRight, IconRss } from "@tabler/icons-react";

import LogoMark from "@ui/LogoMark";
import { CONTACT_ICONS, type ContactItem } from "@core/data/CONTACT";
import { t } from "@lib/i18n";
import { NAV_LINKS } from "./navigation";

const Footer = () => {
    const translate = t();
    const pages = t("pages");
    const contact = t("contact");
    const contactItems = contact.raw<ContactItem[]>("items");
    const socialItems = contactItems.filter(({ id }) => id !== "phone");

    return (
        <footer className="border-t border-border">
            <div className="container-page py-12 lg:py-16">
                <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
                    <div>
                        <Link href="/" className="group inline-flex items-center gap-2.5">
                            <LogoMark className="group-hover:scale-105" />
                            <span className="text-sm font-semibold tracking-tight text-strong">
                                {translate("common.site-name")}
                            </span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                            {translate("metadata.description")}
                        </p>
                        <p className="eyebrow mt-6">{translate("metadata.profession")}</p>
                    </div>

                    <div>
                        <p className="eyebrow">{translate("footer.pages")}</p>
                        <ul className="mt-4 flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {pages(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="eyebrow">{translate("footer.elsewhere")}</p>
                        <ul className="mt-4 flex flex-col gap-3">
                            {socialItems.map(({ id, label, href }) => {
                                const Icon = CONTACT_ICONS[id];

                                return (
                                    <li key={id}>
                                        <Link
                                            href={href}
                                            target={href.startsWith("http") ? "_blank" : undefined}
                                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                                        >
                                            <Icon size={15} aria-hidden />
                                            {label}
                                            <IconArrowUpRight
                                                size={12}
                                                className="opacity-0 transition-opacity group-hover:opacity-100"
                                                aria-hidden
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                            <li>
                                <Link
                                    href="/feed.xml"
                                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                                >
                                    <IconRss size={15} aria-hidden />
                                    {translate("footer.rss")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
                    <p>{translate("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
