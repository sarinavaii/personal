"use client";

import XButton from "@atoms/XButton";
import XSection from "@atoms/XSection";
import { t } from "@lib/i18n";
import Link from "next/link";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "@partials/Sidebar";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const translate = t();
    const pathname = usePathname();

    useEffect(() => {
        close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            <XSection className="flex items-center justify-between">
                <Link href={"/"} className="uppercase">
                    {translate("common.site-name")}
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
            </XSection>

            <Drawer
                classNames={{
                    content:
                        "bg-white dark:bg-woodsmoke-950 border border-woodsmoke-200 dark:border-woodsmoke-900 h-fit pb-2",
                    header: "dark:bg-woodsmoke-950 bg-white",
                    overlay: "backdrop-blur-[2px]",
                }}
                radius={12}
                offset={16}
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
