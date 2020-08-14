export interface NewStarterFormContext {
  submitStep: (step: number, values: any) => void;
  values: { [key: string]: any };
}

export interface NewStarterFormData {
  step: number;
  values: { [key: string]: any };
}

export interface NewStarterProps {
  showSteps?: boolean;
  title?: string;
}

export interface NewStarterStep {
  href: string;
  label: string;
}
