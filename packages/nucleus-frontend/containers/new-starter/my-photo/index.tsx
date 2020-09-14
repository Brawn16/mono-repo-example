import { Image } from "@sdh-project-services/nucleus-ui/dist/image";
import { Panel } from "@sdh-project-services/nucleus-ui/dist/panel";
import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import examplePhotoCorrect from "./example-photo-correct.jpg";
import examplePhotoIncorrect2 from "./example-photo-incorrect-2.jpg";
import examplePhotoIncorrect3 from "./example-photo-incorrect-3.jpg";
import examplePhotoIncorrect from "./example-photo-incorrect.jpg";
import { Form } from "./form";

export function MyPhoto() {
  const header = (
    <>
      <h2 className="text-2xl font-extrabold md:text-3xl font-montserrat">
        Upload your photo
      </h2>
      <h3 className="text-lg">
        To create your worker profile we will need your photo:
      </h3>
    </>
  );

  return (
    <>
      <Head title="Your Photo - New Starter Form" />
      <NewStarterLayout header={header} title="My Photo">
        <Panel className="mt-4">
          <div className="md:grid grid-cols-2 gap-4">
            <div>
              <strong>The photo must:</strong>
              <ul className="pl-4  text-gray-500 list-disc">
                <li>contain no other objects or people</li>
                <li>be taken against a plain light-coloured background</li>
                <li>be in clear contrast to the background</li>
              </ul>
            </div>
            <div className="mt-4 md:mt-0">
              <strong>And you must:</strong>
              <ul className="pl-4 text-gray-500 list-disc">
                <li>be facing forwards and looking straight at the camera</li>
                <li>have a plain expression and your mouth closed</li>
                <li>have your eyes open and visible</li>
                <li>not have hair in front of your eyes</li>
                <li>not have a head covering</li>
                <li>not wear sunglasses or tinted glasses</li>
              </ul>
            </div>
          </div>
          <div className="hidden mt-4 md:block">
            <strong>Examples:</strong>
            <div className="mt-1 text-white grid grid-cols-4 gap-4">
              <div className="relative p-1 border rounded">
                <Image alt="Correct" src={examplePhotoCorrect} />
                <div className="absolute p-2 bg-green-500 rounded-full top-3 right-3">
                  <AiOutlineCheck />
                </div>
              </div>
              <div className="relative p-1 border rounded">
                <Image alt="Incorrect" src={examplePhotoIncorrect} />
                <div className="absolute p-2 bg-red-600 rounded-full top-3 right-3">
                  <AiOutlineClose />
                </div>
              </div>
              <div className="relative p-1 border rounded">
                <Image alt="Incorrect" src={examplePhotoIncorrect2} />
                <div className="absolute p-2 bg-red-600 rounded-full top-3 right-3">
                  <AiOutlineClose />
                </div>
              </div>
              <div className="relative p-1 border rounded">
                <Image alt="Incorrect" src={examplePhotoIncorrect3} />
                <div className="absolute p-2 bg-red-600 rounded-full top-3 right-3">
                  <AiOutlineClose />
                </div>
              </div>
            </div>
          </div>
        </Panel>
        <Form />
      </NewStarterLayout>
    </>
  );
}
