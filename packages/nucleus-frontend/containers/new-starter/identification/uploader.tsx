import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
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
    </div>
  );
}
