import { UploadDropzoneFile } from "../upload-dropzone/types";

export interface UploadGalleryFileProps {
  gridClassName?: string;
  file: UploadDropzoneFile;
  index: number;
}

export interface UploadGalleryProps {
  className?: string;
  gridClassName?: string;
  hideHeader?: boolean;
}
