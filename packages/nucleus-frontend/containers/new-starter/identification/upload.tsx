import { InputHelp } from "@sdh-project-services/nucleus-ui/dist/input-help";
import { UploadDropzone } from "@sdh-project-services/nucleus-ui/dist/upload-dropzone";
import { UploadGallery } from "@sdh-project-services/nucleus-ui/dist/upload-gallery";
import React from "react";
import { UploadProps } from "./types";

export function Upload({
  error,
  onChange,
  options,
  type,
  uploads,
}: UploadProps) {
  const { help, requiredUploads } =
    options.find((option) => option.value === type) || {};

  return (
    <div className="mt-4">
      <UploadDropzone
        accept="image/*"
        error={error}
        multiple={requiredUploads !== 1}
        onChange={onChange}
        tags={["operativeIdentification", "public"]}
        uploads={uploads}
      >
        {help && <InputHelp help={help} />}
        <UploadGallery />
      </UploadDropzone>
    </div>
  );
}
