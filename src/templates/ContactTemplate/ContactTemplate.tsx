import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import {
    IconMail,
    IconPhone,
    IconBrandLinkedin,
    IconBrandTelegram,
    IconBrandGithub,
    IconBrandYoutube,
    IconMailOpenedFilled,
} from "@tabler/icons-react";

const contacts = [
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
    {
        icon: IconBrandYoutube,
        label: "YouTube",
        value: "@sarinavaii",
        href: "https://www.youtube.com/@sarinavaii",
    },
];

const ContactTemplate = () => {
    return (
        <XSection transparent withPadding={false}>
            <div className="flex items-center justify-center mb-6 mt-6">
                <IconMailOpenedFilled size={48} />
            </div>
            <div className="max-w-3xl mx-auto text-center mb-10 text-base text-woodsmoke-700 dark:text-woodsmoke-200">
                <b>Interested in collaborating or have a project in mind?</b> <br /> Whether you want to discuss
                frontend web development, need advice on building scalable React/Next.js applications, or simply want to
                say hello, feel free to reach out through any of the contact methods below. I look forward to connecting
                with you!
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
