import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import React from "react";
import { UploadProps } from "./types";

export function Uploader({ error, name, onChange, values = [] }: UploadProps) {
  return (
    <div className="mt-4">
      <Upload
        error={error}
        multiple
        onChange={value => onChange(name, value)}
        tags={["operativeIdentification", "public"]}
        values={values}
      />
      {values.map(id => (
        <div key={id} className="mt-4">
          <UploadViewer id={id}>
            {({ url }) => (
              <img alt="Profile" className="block max-w-xs" src={url} />
            )}
          </UploadViewer>
        </div>
      ))}
    </div>
  );
}
