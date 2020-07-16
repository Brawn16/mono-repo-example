export interface stepProps {
  items: stepItem[];
  active?: string;
  onClick?: (event: any) => void;
}

export interface stepItem {
  label: string;
  path?: string;
  disabled?: boolean;
}
