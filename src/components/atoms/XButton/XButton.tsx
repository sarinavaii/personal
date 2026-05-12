import { Button, ButtonProps } from "@mantine/core";
import React from "react";

type IButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & ButtonProps;

const XButton = (props: IButtonProps) => {
    return <Button {...props} />;
};

export default XButton;
