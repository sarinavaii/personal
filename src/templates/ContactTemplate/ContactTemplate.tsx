import XSection from "@atoms/XSection";
import Link from "next/link";
import {
    IconMail,
    IconPhone,
    IconBrandLinkedin,
    IconBrandTelegram,
    IconBrandGithub,
    IconBrandYoutube,
    IconMailOpenedFilled,
} from "@tabler/icons-react";
import { t } from "@lib/i18n";
import type { TablerIcon } from "@tabler/icons-react";

type ContactItem = {
    id: string;
    label: string;
    value: string;
    href: string;
};

const CONTACT_ICONS: Record<string, TablerIcon> = {
    email: IconMail,
    phone: IconPhone,
    linkedin: IconBrandLinkedin,
    telegram: IconBrandTelegram,
    github: IconBrandGithub,
    youtube: IconBrandYoutube,
};

const ContactTemplate = () => {
    const translate = t("contact");
    const items = translate.raw("items") as ContactItem[];

    return (
        <XSection transparent withPadding={false}>
            <div className="flex items-center justify-center mb-6 mt-6">
                <IconMailOpenedFilled size={48} />
            </div>
            <div className="max-w-3xl mx-auto text-center mb-10 text-base text-woodsmoke-700 dark:text-woodsmoke-200">
                <b>{translate("intro-heading")}</b> <br /> {translate("intro-description")}
            </div>

            <XSection>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {items.map(({ id, label, value, href }) => {
                        const Icon = CONTACT_ICONS[id];

                        return (
                            <Link
                                key={id}
                                href={href ?? "#"}
                                target={href?.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group"
                            >
                                <div className="p-2 rounded-lg bg-woodsmoke-100 dark:bg-woodsmoke-700 group-hover:bg-woodsmoke-200 dark:group-hover:bg-woodsmoke-800 transition-colors">
                                    {Icon && <Icon size={18} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-woodsmoke-400 dark:text-woodsmoke-500">{label}</span>
                                    <span className="text-sm font-medium">{value}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </XSection>
        </XSection>
    );
};

export default ContactTemplate;
