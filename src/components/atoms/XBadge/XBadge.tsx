import { Badge, BadgeProps } from "@mantine/core";

type IBadgeProps = BadgeProps;

const XBadge = (props: IBadgeProps) => {
    return <Badge variant="default" {...props} />;
};

export default XBadge;
