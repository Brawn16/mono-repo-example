import { DropzoneOptions } from "react-dropzone";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

export interface UploadDropzoneContext {
  files: UploadDropzoneFile[];
  multiple?: boolean;
  onDelete: (index: number) => void;
  onDeleteAll: () => void;
  onUploadComplete: (file: File, id: string) => void;
  tags: string[];
}

export interface UploadDropzoneProps extends DropzoneOptions {
  error?: FieldError;
  iconType?: IconType;
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
