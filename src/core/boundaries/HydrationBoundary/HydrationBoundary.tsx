import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

interface Props extends PropsWithChildren {
    fallback?: React.ReactNode;
}

const HydrationBoundary = ({ children, fallback = null }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default HydrationBoundary;
