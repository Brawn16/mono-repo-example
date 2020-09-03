import { DropzoneOptions } from "react-dropzone";
import { FieldError } from "react-hook-form";

export interface UploadDropzoneContext {
  files: UploadDropzoneFile[];
  onDelete: (index: number) => void;
  onDeleteAll: () => void;
  onUploadComplete: (file: File, id: string) => void;
  tags: string[];
}

export interface UploadDropzoneProps extends DropzoneOptions {
  error?: FieldError;
  label?: string;
  onChange: (uploads: string[]) => void;
  required?: boolean;
  tags: string[];
  uploads?: string[];
}

export interface UploadDropzoneFile {
  file?: File;
  id?: string;
}
