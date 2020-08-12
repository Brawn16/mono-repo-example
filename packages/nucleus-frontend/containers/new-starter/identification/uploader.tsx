import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import React from "react";
import { UploadProps } from "./types";

export const Uploader = (props: UploadProps) => {
  const {
    name,
    error,
    label,
    multiple,
    onChange,
    tags,
    watch,
    getValues,
  } = props;

  const watchIdArray = watch(name, []);
  const idArray: [] = getValues(name);

  return (
    <div className="py-4">
      <Upload
        error={error}
        label={label}
        multiple={multiple}
        onChange={(fileIds) => onChange(fileIds, name)}
        tags={tags}
      />
      {watchIdArray.length > 0 &&
        idArray.map((id) => {
          return (
            <div className="border">
              <UploadViewer key={id} id={id}>
                {({ url }) => (
                  <img alt="Profile" className="block max-w-xs" src={url} />
                )}
              </UploadViewer>
            </div>
          );
        })}
    </div>
  );
};
