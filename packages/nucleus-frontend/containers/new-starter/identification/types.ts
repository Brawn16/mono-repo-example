export interface NewStarterIdentificationFormData {
  identification: NewStarterIdentificationFormDataIdentification[];
}

export interface NewStarterIdentificationFormDataIdentification {
  type: string;
  photos: string[];
}

export interface newStarterIdentification {
  type: string | undefined;
  id: string[];
}

export interface UploadProps {
  error: any;
  label: string;
  multiple: boolean;
  onChange: any;
  tags?: any;
  name: string;
  watch: any;
  getValues: any;
}
