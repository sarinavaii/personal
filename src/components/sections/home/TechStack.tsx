import SectionHeading from "@ui/SectionHeading";
import { cn } from "@core/utils";
import { t } from "@lib/i18n";
import { TECH_STACK_ICONS } from "./tech-stack.icons";

type TechStackItem = {
    id: string;
    label: string;
};

type TechStackCategory = {
    id: string;
    title: string;
    items: TechStackItem[];
};

const TechChip = ({ id, label }: TechStackItem) => {
    const config = TECH_STACK_ICONS[id];

    return (
        <li className="group/chip inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground">
            {config ? (
                <config.Icon
                    size={14}
                    className={cn(
                        "shrink-0 opacity-90 transition-[opacity,transform] duration-300 group-hover/chip:scale-110 group-hover/chip:opacity-100",
                        config.className,
                    )}
                    style={config.color ? { color: config.color } : undefined}
                    aria-hidden
                />
            ) : null}
            {label}
        </li>
    );
};

const TechStack = () => {
    const translate = t("home.techStack");
    const categories = translate.raw<TechStackCategory[]>("categories");

    return (
        <section className="border-b border-border">
            <div className="container-page py-16 lg:py-20">
                <SectionHeading
                    eyebrow={translate("eyebrow")}
                    title={translate("title")}
                    description={translate("description")}
                    className="mb-10"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category.id} className="rounded-xl border border-border bg-surface p-5">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                                    {category.title}
                                </h3>
                                <span className="font-mono text-[10px] text-faint">
                                    {String(category.items.length).padStart(2, "0")}
                                </span>
                            </div>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {category.items.map((item) => (
                                    <TechChip key={item.id} {...item} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
