import { Panel } from "@sdh-project-services/nucleus-ui/dist/panel";
import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function MyPhoto() {
  return (
    <>
      <Head title="My Photo - New Starter Form" />
      <NewStarterLayout headerTitle="Your photo" title="My Photo">
        To create your worker profile we will need your photo:
        <Panel className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold">The photo must:</div>
            <ul className="pl-4  text-gray-500 list-disc">
              <li>contain no other objects or people</li>
              <li>be taken against a plain light-coloured background</li>
              <li>be in clear contrast to the background</li>
            </ul>
          </div>
          <div>
            <div className="font-bold">And you must:</div>
            <ul className="text-gray-500 list-disc pl-4s">
              <li>be facing forwards and looking straight at the camera</li>
              <li>have a plain expression and your mouth closed</li>
              <li>have your eyes open and visible</li>
              <li>not have hair in front of your eyes</li>
              <li>not have a head covering</li>
              <li>not wear sunglasses or tinted glasses</li>
            </ul>
          </div>
        </Panel>
        <Form />
      </NewStarterLayout>
    </>
  );
}
