import { FieldError } from "react-hook-form";

export interface NewStarterIdentificationFormData {
  identifications: NewStarterIdentificationFormDataIdentification[];
}

export interface NewStarterIdentificationFormDataIdentification {
  identification: string;
  uploads: Array<string | undefined>;
}

export interface NewStarterIdentificationOption {
  label: string;
  uploadTypes: string[];
  value: string;
}

export interface UploadProps {
  error?: FieldError;
  onChange: (uploads: string[]) => void;
  uploads?: Array<string | undefined>;
  uploadTypes: string[];
}
