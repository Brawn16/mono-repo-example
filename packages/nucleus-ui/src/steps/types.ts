export interface stepProps {
  items: stepObject[];
  active?: string;
  onClick?: (event: any) => void;
}

export interface stepObject {
  label: string;
  path?: string;
  disabled?: boolean;
}
