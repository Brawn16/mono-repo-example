import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons/lib/cjs";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  iconType?: IconType;
  postionIconRight?: boolean;
  loading?: boolean;
}
