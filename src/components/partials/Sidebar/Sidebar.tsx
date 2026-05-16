import React from "react";
import { Link } from "@i18n/navigation";
import { IconHome, IconArticle, IconFolder, IconMail } from "@tabler/icons-react";

const links = [
    { href: "/", label: "Home", icon: IconHome },
    { href: "/blog", label: "Blog", icon: IconArticle },
    { href: "/projects", label: "Projects", icon: IconFolder },
    { href: "/contact", label: "Contact", icon: IconMail },
];

const Sidebar = () => {
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
                            {link.label}
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
