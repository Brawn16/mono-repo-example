import { action } from "@storybook/addon-actions";
import React from "react";
import { FaLock } from "react-icons/fa";
import { Button, DangerButton, SecondaryButton } from ".";

export default {
  component: Button,
  title: "Button",
};

export const basicButton = () => {
  return (
    <div className="space-y-6">
      <Button onClick={action("button-click")}>Button</Button>
      <Button isDisabled onClick={action("button-click")}>
        Disabled
      </Button>
    </div>
  );
};

export const buttonWithIcon = () => {
  return (
    <div className="space-y-6">
      <Button iconType={FaLock} postionIconRight>
        Button
      </Button>
      <Button iconType={FaLock}>Button</Button>
    </div>
  );
};

export const dangerButton = () => {
  return <DangerButton>Danger </DangerButton>;
};

export const secondaryButton = () => {
  return (
    <SecondaryButton onClick={action("button-click")}>
      Secondary
    </SecondaryButton>
  );
};
