import { action } from "@storybook/addon-actions";
import React from "react";
import { FaLock } from "react-icons/fa";
import { Button, DangerButton } from ".";

export default {
  component: Button,
  title: "Button",
};

export const basicButton = () => {
  return <Button onClick={action("button-click")}>Button</Button>;
};

export const buttonWithIcon = () => {
  return <Button iconType={FaLock}>Button</Button>;
};

export const dangerButton = () => {
  return <DangerButton>Danger </DangerButton>;
};
