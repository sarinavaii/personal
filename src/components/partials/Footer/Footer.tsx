"use client";

import XSection from "@atoms/XSection";
import XSwitch from "@atoms/XSwitch";
import HydrationBoundary from "@core/boundaries/HydrationBoundary";
import { useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
    const t = useTranslations();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    return (
        <XSection transparent className="flex flex-col gap-4 items-center">
            <HydrationBoundary>
                <XSwitch
                    withThumbIndicator={false}
                    color="woodsmoke.5"
                    size="md"
                    onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
                    offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
                    checked={colorScheme === "light"}
                    onChange={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
                />
            </HydrationBoundary>
            <div className="text-center text-sm">{t("footer.copyright")}</div>
        </XSection>
    );
};

export default Footer;
