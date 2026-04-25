import { Switch, SwitchProps } from "@mantine/core";
import React from "react";

type ISwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & SwitchProps;

const SSwitch = (props: ISwitchProps) => {
    return <Switch {...props} />;
};

export default SSwitch;
