import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import React from "react";
import { Anchor } from "../../components/anchor";
import { NewStarterNavigationProps } from "./types";

export function Navigation({
  previousHref,
}: NewStarterNavigationProps): React.ReactElement {
  return (
    <div className="flex justify-between mt-8">
      <div className="hidden md:block">
        <Anchor href={previousHref}>
          <SecondaryButton>Previous</SecondaryButton>
        </Anchor>
      </div>
      <PrimaryButton className="w-full md:w-auto">Next </PrimaryButton>
    </div>
  );
}
