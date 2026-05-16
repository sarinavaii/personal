import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import {
    IconMail,
    IconPhone,
    IconBrandLinkedin,
    IconBrandTelegram,
    IconBrandGithub,
    IconMap,
} from "@tabler/icons-react";

const contacts = [
    {
        icon: IconMap,
        label: "Location",
        value: "Sari, Iran",
    },
    {
        icon: IconMail,
        label: "Email",
        value: "salarsarinavaii@gmail.com",
        href: "mailto:salarsarinavaii@gmail.com",
    },
    {
        icon: IconPhone,
        label: "Phone",
        value: "+98 921 134 2004",
        href: "tel:+989211342004",
    },
    {
        icon: IconBrandLinkedin,
        label: "LinkedIn",
        value: "salarsarinavaii",
        href: "https://www.linkedin.com/in/salarsarinavaii/",
    },
    {
        icon: IconBrandTelegram,
        label: "Telegram",
        value: "@sarinavaii",
        href: "https://t.me/sarinavaii",
    },
    {
        icon: IconBrandGithub,
        label: "GitHub",
        value: "sarinavaii",
        href: "https://github.com/sarinavaii",
    },
];

const ContactTemplate = () => {
    return (
        <XSection transparent withPadding={false}>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-1">Salar Sari Navaii</h1>
                <p className="text-sm text-woodsmoke-500 dark:text-woodsmoke-300 mb-4">Senior Frontend Web Developer</p>
                <p className="text-sm text-woodsmoke-600 dark:text-woodsmoke-300 leading-relaxed">
                    5 years of experience building production-ready web applications with Next.js and React. Tech lead
                    with a strong background in architecture, performance optimization, and mentoring. Open to remote
                    work and freelance projects.
                </p>
            </div>

            <XSection>
                <div className="grid grid-cols-3 gap-6">
                    {contacts.map(({ icon: Icon, label, value, href }) => (
                        <Link
                            key={label}
                            href={href ?? "#"}
                            target={href?.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 group"
                        >
                            <div className="p-2 rounded-lg bg-woodsmoke-100 dark:bg-woodsmoke-700 group-hover:bg-woodsmoke-200 dark:group-hover:bg-woodsmoke-800 transition-colors">
                                <Icon size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-woodsmoke-400 dark:text-woodsmoke-500">{label}</span>
                                <span className="text-sm font-medium">{value}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </XSection>
        </XSection>
    );
};

export default ContactTemplate;
