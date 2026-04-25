import { SegmentedControl, SegmentedControlProps } from "@mantine/core";

type ISegmentedControlProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & SegmentedControlProps;

const SSegmentedControl = (props: ISegmentedControlProps) => {
    return <SegmentedControl {...props} />;
};

export default SSegmentedControl;
