import { action } from "@storybook/addon-actions";
import React from "react";
import { FaLock, FaCheck } from "react-icons/fa";
import {
  Button,
  PrimaryButton,
  DangerButton,
  SecondaryButton,
  SuccessButton,
} from ".";

export default {
  component: Button,
  title: "Button",
};

export const button = () => {
  return (
    <div className="space-x-2">
      <Button onClick={action("onClick")}>Button</Button>
      <Button disabled onClick={action("onClick")}>
        Disabled
      </Button>
    </div>
  );
};

export const buttonWithIcon = () => {
  return (
    <div className="flex space-x-2">
      <PrimaryButton
        iconType={FaLock}
        onClick={action("onClick")}
        postionIconRight
      >
        Button
      </PrimaryButton>
      <PrimaryButton iconType={FaLock} onClick={action("onClick")}>
        Button
      </PrimaryButton>
    </div>
  );
};

export const dangerButton = () => {
  return <DangerButton onClick={action("onClick")}>Danger</DangerButton>;
};

export const primaryButton = () => {
  return (
    <div className="space-x-2">
      <PrimaryButton onClick={action("onClick")}>Primary</PrimaryButton>
      <PrimaryButton disabled onClick={action("onClick")}>
        Disabled
      </PrimaryButton>
    </div>
  );
};

export const secondaryButton = () => {
  return (
    <SecondaryButton onClick={action("onClick")}>Secondary</SecondaryButton>
  );
};

export const successButton = () => {
  return (
    <SuccessButton iconType={FaCheck} onClick={action("onClick")}>
      Success
    </SuccessButton>
  );
};
