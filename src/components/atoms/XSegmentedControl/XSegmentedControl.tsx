import { SegmentedControl, SegmentedControlProps } from "@mantine/core";

type ISegmentedControlProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value" | "defaultValue"
> &
    SegmentedControlProps;

const XSegmentedControl = (props: ISegmentedControlProps) => {
    return <SegmentedControl {...props} />;
};

export default XSegmentedControl;
