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

export const basicButton = () => {
  return (
    <div className="space-x-2">
      <Button onClick={action("button-click")}>BUTTON</Button>
      <Button disabled onClick={action("button-click")}>
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
        onClick={action("button-click")}
        postionIconRight
      >
        Button
      </PrimaryButton>
      <PrimaryButton iconType={FaLock} onClick={action("button-click")}>
        Button
      </PrimaryButton>
      <PrimaryButton iconType={FaLock} loading onClick={action("button-click")}>
        Button
      </PrimaryButton>
    </div>
  );
};

export const dangerButton = () => {
  return <DangerButton onClick={action("button-click")}>Danger</DangerButton>;
};

export const secondaryButton = () => {
  return (
    <SecondaryButton onClick={action("button-click")}>
      Secondary
    </SecondaryButton>
  );
};

export const successButton = () => {
  return (
    <SuccessButton iconType={FaCheck} onClick={action("button-click")}>
      Success
    </SuccessButton>
  );
};

export const primaryButton = () => {
  return (
    <div className="space-x-2">
      <PrimaryButton onClick={action("button-click")}>PRIMARY</PrimaryButton>
      <PrimaryButton disabled onClick={action("button-click")}>
        Disabled
      </PrimaryButton>
    </div>
  );
};
