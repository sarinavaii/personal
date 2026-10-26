import XSection from "@atoms/XSection";
import { cn } from "@core/utils";
import { t } from "@lib/i18n";
import { TECH_STACK_ICONS } from "./techStack.icons";

type TechStackItem = {
    id: string;
    label: string;
};

type TechStackCategory = {
    id: string;
    title: string;
    items: TechStackItem[];
};

const TechStackItemCard = ({ id, label }: TechStackItem) => {
    const config = TECH_STACK_ICONS[id];

    return (
        <li
            className={cn(
                "flex shrink-0 w-[112px] flex-col items-center justify-center gap-2 rounded-xl border border-woodsmoke-200 dark:border-woodsmoke-900",
                "bg-woodsmoke-50 dark:bg-woodsmoke-950 p-3 min-h-[88px]",
            )}
        >
            {config ? (
                <config.Icon
                    size={28}
                    stroke={1.5}
                    className={cn("shrink-0", config.className)}
                    style={config.color ? { color: config.color } : undefined}
                    aria-hidden
                />
            ) : null}
            <span className="text-xs text-center leading-snug text-woodsmoke-700 dark:text-woodsmoke-300">{label}</span>
        </li>
    );
};

const TechStackMarquee = ({ items, direction }: { items: TechStackItem[]; direction: "ltr" | "rtl" }) => {
    const trackItems = [...items, ...items];

    return (
        <div className="tech-marquee-mask overflow-hidden">
            <ul
                className={cn(
                    "flex w-max gap-3",
                    direction === "ltr" ? "animate-tech-marquee-ltr" : "animate-tech-marquee-rtl",
                )}
            >
                {trackItems.map((item, index) => (
                    <TechStackItemCard key={`${item.id}-${index}`} {...item} />
                ))}
            </ul>
        </div>
    );
};

const TechStack = () => {
    const translate = t("home.techStack");
    const categories = translate.raw("categories") as TechStackCategory[];
    const allItems = categories.flatMap((category) => category.items);
    const midpoint = Math.ceil(allItems.length / 2);
    const topRow = allItems.slice(0, midpoint);
    const bottomRow = allItems.slice(midpoint);

    return (
        <XSection transparent withPadding={false}>
            <div className="flex flex-col gap-4">
                <TechStackMarquee items={topRow} direction="ltr" />
                <TechStackMarquee items={bottomRow} direction="rtl" />
            </div>
        </XSection>
    );
};

export default TechStack;
