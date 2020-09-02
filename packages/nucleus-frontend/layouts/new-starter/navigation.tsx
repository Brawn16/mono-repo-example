import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { useRouter } from "next/router";
import React from "react";
import { Anchor } from "../../components/anchor";
import { steps } from "./steps";

export function Navigation() {
  const { asPath } = useRouter();
  const stepIndex = steps.findIndex(step => step.href === asPath);
  const { href } = steps[stepIndex - 1];

  return (
    <div className="flex justify-between mt-8">
      <div className="hidden md:block">
        <Anchor href={href}>
          <SecondaryButton>Previous</SecondaryButton>
        </Anchor>
      </div>
      <PrimaryButton className="w-full md:w-auto" type="submit">
        Next{" "}
      </PrimaryButton>
    </div>
  );
}
