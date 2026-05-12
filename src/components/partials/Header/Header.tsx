"use client";

import XButton from "@atoms/XButton";
import XSection from "@atoms/XSection";
import { Link } from "@i18n/navigation";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "@partials/Sidebar";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const t = useTranslations();
    const pathname = usePathname();

    useEffect(() => {
        close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            <XSection className="flex items-center justify-between">
                <Link href={"/"} className="uppercase">
                    {t("common.site-name")}
                </Link>
                <XButton
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
                </XButton>
                {/* <div className="flex gap-1 text-sm">
                    <Link href="en">EN</Link>|<Link href="fa">FA</Link>
                </div> */}
            </XSection>

            <Drawer
                classNames={{
                    content: "dark:bg-woodsmoke-900 bg-white",
                    header: "dark:bg-woodsmoke-900 bg-white",
                }}
                opened={opened}
                onClose={close}
                position="right"
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
