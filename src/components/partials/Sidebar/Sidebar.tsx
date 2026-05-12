import React from "react";
import { Link } from "@i18n/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
];

const Sidebar = () => {
    return (
        <nav className="flex flex-col gap-4">
            {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-lg font-medium relative group">
                    <span className="inline-block relative">
                        {link.label}
                        <span
                            className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-woodsmoke-900 dark:bg-woodsmoke-50 transition-all duration-300"
                            aria-hidden="true"
                        />
                    </span>
                </Link>
            ))}
        </nav>
    );
};

export default Sidebar;
