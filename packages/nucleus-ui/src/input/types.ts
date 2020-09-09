import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  componentRef?: Ref<HTMLInputElement>;
  error?: FieldError;
  help?: string;
  label?: string;
  name: string;
  iconType?: IconType;
  positionIconLeft?: boolean;
}
