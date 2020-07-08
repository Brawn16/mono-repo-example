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
    <div className="space-y-6">
      <Button onClick={action("button-click")}>BUTTON</Button>
      <Button disabled onClick={action("button-click")}>
        DISABLED
      </Button>
    </div>
  );
};

export const buttonWithIcon = () => {
  return (
    <div className="space-y-6">
      <PrimaryButton
        iconType={FaLock}
        onClick={action("button-click")}
        postionIconRight
      >
        BUTTON
      </PrimaryButton>
      <PrimaryButton iconType={FaLock} onClick={action("button-click")}>
        BUTTON
      </PrimaryButton>
    </div>
  );
};

export const dangerButton = () => {
  return <DangerButton onClick={action("button-click")}>DANGER </DangerButton>;
};

export const secondaryButton = () => {
  return (
    <SecondaryButton onClick={action("button-click")}>
      SECONDARY
    </SecondaryButton>
  );
};

export const successButton = () => {
  return (
    <SuccessButton iconType={FaCheck} onClick={action("button-click")}>
      SUCCESS
    </SuccessButton>
  );
};

export const primaryButton = () => {
  return (
    <div className="space-y-6">
      <PrimaryButton onClick={action("button-click")}>PRIMARY</PrimaryButton>
      <PrimaryButton disabled onClick={action("button-click")}>
        DISABLED
      </PrimaryButton>
    </div>
  );
};
