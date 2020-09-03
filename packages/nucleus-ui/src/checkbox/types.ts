import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, Ref } from "react";
import { FieldError } from "react-hook-form";

export interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  componentRef?: Ref<HTMLInputElement>;
  error?: FieldError;
  label: string | ReactNode;
  name: string;
}
