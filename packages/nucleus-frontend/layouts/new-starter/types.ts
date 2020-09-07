import { ReactNode } from "react";

export interface NavigationProps {
  nextLabel?: string;
}

export interface NewStarterFormContext {
  submitStep: (values: { [key: string]: any }) => void;
  values: { [key: string]: any };
}

export interface NewStarterFormData {
  step: number;
  values: { [key: string]: any };
}

export interface NewStarterProps {
  header?: ReactNode;
  headerTitle?: string;
  showSteps?: boolean;
  title?: string;
}

export interface NewStarterStep {
  href: string;
  label: string;
}
