import { InputError } from "@sdh-project-services/nucleus-ui/dist/input-error";
import { UploadDropzone } from "@sdh-project-services/nucleus-ui/dist/upload-dropzone";
import { UploadGallery } from "@sdh-project-services/nucleus-ui/dist/upload-gallery";
import React from "react";
import { UploadProps } from "./types";

export function Uploads(props: UploadProps) {
  const { error, onChange, uploadTypes } = props;
  const { uploads = new Array(uploadTypes.length) } = props;
  const renderDropzone = (uploadType: string, index: number) => {
    const handleChange = ([upload]: string[]) => {
      const newUploads = [...uploads];
      newUploads[index] = upload;
      onChange(newUploads);
    };

    return (
      <UploadDropzone
        key={uploadType}
        accept="image/gif,image/jpeg,image/png"
        fileLabel={uploadType}
        onChange={handleChange}
        tags={["operativeIdentification", "public"]}
        uploads={uploads && uploads[index] && [uploads[index]]}
      >
        <UploadGallery className="" gridClassName="" hideHeader />
      </UploadDropzone>
    );
  };

  const dropzones = uploadTypes.map((uploadType, index) =>
    renderDropzone(uploadType, index)
  );

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-4">{dropzones}</div>
      {error && <InputError error={error} />}
    </>
  );
}
