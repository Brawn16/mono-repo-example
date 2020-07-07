import { IconType } from "react-icons/lib/cjs";

export interface ButtonProps {
  className?: string;
  iconType?: IconType;
  onClick?: (event: React.MouseEvent) => void;
}
