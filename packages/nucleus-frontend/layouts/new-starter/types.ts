export interface NewStarterFormContext {
  submitStep: (step: number, values: any) => void;
  values: { [key: string]: string };
}

export interface NewStarterFormData {
  step: number;
  values: { [key: string]: string };
}

export interface NewStarterProps {
  showSteps?: boolean;
}

export interface NewStarterStep {
  href: string;
  label: string;
}
