import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { FormContext, Context } from "../../../contexts/context";
import {
  setFormWithLocalStorage,
  initiatePageToLocal,
} from "../../../helpers/helper";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

const handleClick = () => {
  Router.push("/new-starter/qualifications");
};

export function MyPhoto(): React.ReactElement {
  const { setFormData } = useContext<FormContext | any>(Context);

  useEffect(() => {
    setFormWithLocalStorage("MyPhoto", () => {});
    initiatePageToLocal("myPhoto", setFormData);
  }, []);

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
            <Anchor href="/new-starter/medical">
              <PrimaryButton onClick={handleClick}>Continue</PrimaryButton>
            </Anchor>
          </div>
        </div>
      </NewStarterLayout>
    </>
  );
}
