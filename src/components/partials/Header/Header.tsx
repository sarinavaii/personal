"use client";

import SButton from "@atoms/Button";
import Section from "@atoms/Section";
import { Link } from "@i18n/navigation";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "@partials/Sidebar";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const Header = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const t = useTranslations();
    return (
        <>
            <Section className="flex items-center justify-between">
                <SButton
                    variant="transparent"
                    color="woodsmoke"
                    classNames={{
                        root: "aspect-square p-0",
                    }}
                    p={0}
                    radius={8}
                    onClick={open}
                >
                    <IconMenu size={20} />
                </SButton>
                <h1 className="uppercase">{t("common.site-name")}</h1>
                <div className="flex gap-1 text-sm">
                    <Link href="en">EN</Link>|<Link href="fa">FA</Link>
                </div>
            </Section>

            <Drawer
                classNames={{
                    content: "dark:bg-woodsmoke-900 bg-white",
                    header: "dark:bg-woodsmoke-900 bg-white",
                }}
                opened={opened}
                onClose={close}
                size="xs"
                closeButtonProps={{
                    icon: <IconX size={20} />,
                }}
            >
                <Sidebar />
            </Drawer>
        </>
    );
};

export default Header;
