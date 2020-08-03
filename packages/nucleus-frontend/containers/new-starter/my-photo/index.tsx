import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import React from "react";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function MyPhoto(): React.ReactElement {
  return (
    <>
      <Head title="New Starter Form" />
      <NewStarterLayout>
        <div className="px-5">
          <div>To create your worker profile we will need your photo:</div>
          <div className="py-2">
            <div className="font-bold">The photo must:</div>
            <ul className="pl-4 list-disc">
              <li>contain no other objects or people</li>
              <li>be taken against a plain light-coloured background</li>
              <li>be in clear contrast to the background</li>
            </ul>
          </div>
          <div className="py-2">
            <div className="font-bold">And you must:</div>
            <ul className="pl-4 list-disc">
              <li>be facing forwards and looking straight at the camera</li>
              <li>have a plain expression and your mouth closed</li>
              <li>have your eyes open and visible</li>
              <li>not have hair in front of your eyes</li>
              <li>not have a head covering</li>
              <li>not wear sunglasses or tinted glasses</li>
            </ul>
          </div>

          <div className="flex justify-between py-2">
            <Button>BACK</Button>
            <Anchor href="/new-starter/personal-details">
              <PrimaryButton>Continue</PrimaryButton>
            </Anchor>
          </div>
        </div>
      </NewStarterLayout>
    </>
  );
}
