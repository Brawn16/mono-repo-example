export interface StepProps {
  active?: string;
  onClick?: (step: Step) => void;
  steps: Step[];
}

export interface Step {
  disabled?: boolean;
  href?: string;
  label: string;
}
