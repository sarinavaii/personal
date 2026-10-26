import type { TablerIcon } from "@tabler/icons-react";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTelegram,
    IconBrandYoutube,
    IconMail,
    IconPhone,
} from "@tabler/icons-react";

export type ContactItem = {
    id: string;
    label: string;
    value: string;
    href: string;
};

export const CONTACT_ICONS: Record<string, TablerIcon> = {
    email: IconMail,
    phone: IconPhone,
    linkedin: IconBrandLinkedin,
    telegram: IconBrandTelegram,
    github: IconBrandGithub,
    youtube: IconBrandYoutube,
};
