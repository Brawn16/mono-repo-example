import { FieldError } from "react-hook-form";

export interface NewStarterIdentificationFormData {
  identifications: NewStarterIdentificationFormDataIdentification[];
}

export interface NewStarterIdentificationFormDataIdentification {
  type: string;
  uploads: string[];
}

export interface UploadProps {
  error?: FieldError;
  onChange: (name: string, value: string[]) => void;
  name: string;
  values?: string[];
}
