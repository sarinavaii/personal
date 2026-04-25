import { createTheme, DirectionProvider, MantineProvider } from "@mantine/core";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    const theme = createTheme({
        primaryColor: "woodsmoke",
        primaryShade: {
            dark: 9,
            light: 5,
        },
        cursorType: "pointer",
        colors: {
            woodsmoke: [
                "#f5f6f6",
                "#e5e8e7",
                "#cdd4d3",
                "#abb5b3",
                "#818f8d",
                "#667472",
                "#576362",
                "#4a5453",
                "#424847",
                "#3a3f3f",
                "#111313",
            ],
        },
    });

    const locale = useLocale();

    return (
        <NextIntlClientProvider>
            <DirectionProvider initialDirection={locale === "fa" ? "rtl" : "ltr"}>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </DirectionProvider>
        </NextIntlClientProvider>
    );
};

export default Providers;
