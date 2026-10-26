import Link from "next/link";
import { IconHome, IconArticle, IconMail, IconFolder } from "@tabler/icons-react";
import { t } from "@lib/i18n";

const links = [
    { href: "/", labelKey: "home", icon: IconHome },
    { href: "/blog", labelKey: "blog", icon: IconArticle },
    { href: "/projects", labelKey: "projects", icon: IconFolder },
    { href: "/contact", labelKey: "contact", icon: IconMail },
] as const;

const Sidebar = () => {
    const translate = t("pages");

    return (
        <nav className="flex flex-col gap-4">
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium relative group flex items-center gap-2"
                    >
                        <Icon size={20} />
                        <span className="inline-block relative">
                            {translate(link.labelKey)}
                            <span
                                className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-woodsmoke-900 dark:bg-woodsmoke-50 transition-all duration-300"
                                aria-hidden="true"
                            />
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default Sidebar;
