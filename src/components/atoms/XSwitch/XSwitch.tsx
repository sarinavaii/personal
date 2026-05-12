import { Switch, SwitchProps } from "@mantine/core";
import React from "react";

type ISwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & SwitchProps;

const XSwitch = (props: ISwitchProps) => {
    return <Switch {...props} />;
};

export default XSwitch;
