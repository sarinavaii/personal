import { IconArrowRight, IconMail } from "@tabler/icons-react";

import ButtonLink from "@ui/ButtonLink";
import type { ContactItem } from "@core/data/CONTACT";
import { t } from "@lib/i18n";

const ContactCTA = () => {
    const translate = t("home.cta");
    const email = t("contact")
        .raw<ContactItem[]>("items")
        .find((item) => item.id === "email");

    return (
        <section>
            <div className="container-page py-16 lg:py-24">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12">
                    <div
                        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent-soft blur-3xl"
                        aria-hidden
                    />

                    <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <p className="eyebrow">{translate("eyebrow")}</p>
                            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-strong sm:text-4xl">
                                {translate("title")}
                            </h2>
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                                {translate("description")}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {email ? (
                                <ButtonLink href={email.href}>
                                    <IconMail size={15} aria-hidden />
                                    {translate("email")}
                                </ButtonLink>
                            ) : null}
                            <ButtonLink href="/contact" variant="secondary">
                                {translate("options")}
                                <IconArrowRight size={15} aria-hidden />
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
