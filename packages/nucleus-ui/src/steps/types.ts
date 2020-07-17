export interface StepProps {
  items: StepItem[];
  active?: string;
  onClick?: (stepItem: StepItem) => void;
}

export interface StepItem {
  label: string;
  path?: string;
  disabled?: boolean;
}
