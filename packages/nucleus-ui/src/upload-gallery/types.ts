import { UploadDropzoneFile } from "../upload-dropzone/types";

export interface UploadGalleryFileProps {
  dropzoneFile: UploadDropzoneFile;
  gridClassName?: string;
  index: number;
}

export interface UploadGalleryProps {
  className?: string;
  gridClassName?: string;
  hideHeader?: boolean;
}
