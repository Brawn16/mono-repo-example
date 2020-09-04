import { FieldError } from "react-hook-form";

export interface NewStarterIdentificationFormData {
  identifications: NewStarterIdentificationFormDataIdentification[];
}

export interface NewStarterIdentificationFormDataIdentification {
  type: string;
  uploads: string[];
}

export interface NewStarterIdentificationOption {
  help: string;
  label: string;
  requiredUploads: number;
  value: string;
}

export interface UploadProps {
  error?: FieldError;
  onChange: (uploads: string[]) => void;
  options: NewStarterIdentificationOption[];
  type: string;
  uploads?: string[];
}
