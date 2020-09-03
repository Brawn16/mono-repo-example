import { Panel } from "@sdh-project-services/nucleus-ui/dist/panel";
import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function MyPhoto() {
  return (
    <>
      <Head title="My Photo - New Starter Form" />
      <NewStarterLayout backHref="/new-starter/qualifications" title="My Photo">
        <div className="max-w-2xl">
          <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
            Your photograph
          </p>
          <div className="max-w-2xl my-8">
            To create your worker profile we will need your photo:
          </div>
          <Panel>
            <>
              <div className="font-bold">The photo must:</div>
              <ul className="pl-4 ml-6 text-gray-500 list-disc">
                <li>contain no other objects or people</li>
                <li>be taken against a plain light-coloured background</li>
                <li>be in clear contrast to the background</li>
              </ul>
            </>
          </Panel>
          <Panel className="my-4">
            <>
              <div className="font-bold">And you must:</div>
              <ul className="pl-4 ml-6 text-gray-500 list-disc">
                <li>be facing forwards and looking straight at the camera</li>
                <li>have a plain expression and your mouth closed</li>
                <li>have your eyes open and visible</li>
                <li>not have hair in front of your eyes</li>
                <li>not have a head covering</li>
                <li>not wear sunglasses or tinted glasses</li>
              </ul>
            </>
            <img
              alt="passport example"
              className="w-1/2 my-2 md:w-1/5"
              src="https://www.dfa.ie/media/dfa/passport/passportphotographs/photojpen-117-300x450.jpg"
            />
          </Panel>

          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
