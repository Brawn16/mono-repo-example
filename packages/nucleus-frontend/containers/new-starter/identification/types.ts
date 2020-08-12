import { FieldError } from "react-hook-form";

export interface NewStarterIdentificationFormData {
  identification: NewStarterIdentificationFormDataIdentification[];
}

export interface NewStarterIdentificationFormDataIdentification {
  photos: string[];
  type: string;
}

export interface UploadProps {
  error?: FieldError;
  onChange: (name: string, value: string[]) => void;
  name: string;
  values?: string[];
}
