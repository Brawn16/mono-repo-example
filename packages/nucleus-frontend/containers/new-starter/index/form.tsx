import { PrimaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import React, { useContext } from "react";
import { Context } from "../../../layouts/new-starter/context";

export function Form(): React.ReactElement {
  const { submitStep } = useContext(Context);
  const handleClick = () => {
    submitStep(0, {});
  };

  return <PrimaryButton onClick={handleClick}>Continue</PrimaryButton>;
}
