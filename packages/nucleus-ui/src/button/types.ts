import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons/lib/cjs";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  iconType?: IconType;
  onClick?: (event: React.MouseEvent) => void;
  postionIconRight?: boolean;
  isDisabled?: boolean;
}
