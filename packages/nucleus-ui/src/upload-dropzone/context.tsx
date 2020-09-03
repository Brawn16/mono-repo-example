import { createContext } from "react";
import { UploadDropzoneContext } from "./types";

export const Context = createContext<UploadDropzoneContext>({
  files: [],
  multiple: false,
  onDelete: () => {
    //
  },
  onDeleteAll: () => {
    //
  },
  onUploadComplete: () => {
    //
  },
  tags: [],
});
