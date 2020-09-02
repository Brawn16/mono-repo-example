import { createContext } from "react";
import { UploadDropzoneContext } from "./types";

export const Context = createContext<UploadDropzoneContext>({
  files: [],
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
