import { DropzoneOptions } from "react-dropzone";
import { FieldError } from "react-hook-form";

export interface UploadInProgressProps {
  file: File;
  onComplete: (id: string, name: string) => void;
  onDelete: () => void;
  tags: string[];
}

export interface UploadProps extends DropzoneOptions {
  error?: FieldError;
  label?: string;
  onChange: (fileIds: string[]) => void;
  required?: boolean;
  tags: string[];
}

export interface UploadUploadedProps {
  id: string;
  name?: string;
  onDelete: () => void;
}
