import { PropsWithChildren, useSyncExternalStore } from "react";

interface Props extends PropsWithChildren {
    fallback?: React.ReactNode;
}

// No-op subscription: the value never changes after hydration.
const subscribe = () => () => {};

const HydrationBoundary = ({ children, fallback = null }: Props) => {
    // Server + hydration render `false`, the client render after hydration `true`.
    // Avoids the setState-in-effect cascade that the react-hooks lint rule rejects.
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );

    return <>{mounted ? children : fallback}</>;
};

export default HydrationBoundary;
