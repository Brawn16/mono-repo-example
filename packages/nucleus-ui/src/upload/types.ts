import { DropzoneOptions } from "react-dropzone";
import { FieldError } from "react-hook-form";

export interface UploadInProgressProps {
  file: File;
  onComplete: (id: string, name: string) => void;
  onDelete: () => void;
  tags: string[];
}

export interface UploadProps extends DropzoneOptions {
  buttonEntity?: string;
  error?: FieldError;
  label?: string;
  onChange: (fileIds: string[]) => void;
  required?: boolean;
  tags: string[];
  values?: string[];
}

export interface UploadUploadedProps {
  buttonEntity: string;
  id: string;
  index: number;
  name?: string;
  onDelete: () => void;
}
