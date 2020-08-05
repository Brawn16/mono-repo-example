import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterMyPhotoFormData } from "./types";

export function MyPhoto(): React.ReactElement {
  const { errors, handleSubmit, setValue } = useForm<
    NewStarterMyPhotoFormData
  >();
  const [photoId, setPhotoId] = useState<string>();

  const handleChange = ([id]: string[]) => {
    setValue("photoId", id);
    setPhotoId(id);
  };

  return (
    <>
      <Head title="New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit(data => {
            /* eslint-disable-next-line no-console */
            console.log("data", data);
          })}
        >
          <div>To create your worker profile we will need your photo:</div>
          <div className="mt-8">
            <div className="font-bold">The photo must:</div>
            <ul className="pl-4 list-disc">
              <li>contain no other objects or people</li>
              <li>be taken against a plain light-coloured background</li>
              <li>be in clear contrast to the background</li>
            </ul>
          </div>
          <div className="mt-8">
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
          <div className="mt-8">
            <Upload
              accept="image/*"
              buttonEntity="photo"
              error={errors.photoId}
              label="Upload Photo"
              onChange={handleChange}
              tags={["profile-pic", "public"]}
            />
            {photoId && (
              <UploadViewer id={photoId}>
                {({ url }) => (
                  <img alt="Profile" className="block max-w-xs" src={url} />
                )}
              </UploadViewer>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <Anchor href="/new-starter/identification">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
