export interface stepProps {
  items: stepObject[];
  active?: string;
}

export interface stepObject {
  label: string;
  path?: string;
  disabled?: boolean;
}
