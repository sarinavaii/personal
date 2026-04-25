import Section from "@atoms/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Hero = () => {
    const t = useTranslations();
    return (
        <Section transparent className="mt-8">
            <div className="flex justify-center items-center gap-4">
                <Image
                    className="rounded-full sm:w-24 w-20"
                    src="/images/profile.jpg"
                    alt={t("common.site-name")}
                    width={400}
                    height={400}
                />
                <h2 className="sm:text-2xl text-lg">
                    <span className="text-woodsmoke-500 font-bold">{t("home.hero.tagline-1")}</span>
                    <br /> {t("home.hero.tagline-2")}
                </h2>
            </div>
            <p className="text-center max-w-xl mx-auto mt-6">{t("home.hero.description")}</p>
        </Section>
    );
};

export default Hero;
