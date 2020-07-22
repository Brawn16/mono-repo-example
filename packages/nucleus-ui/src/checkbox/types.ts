import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";
import { FieldError } from "react-hook-form";

export interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  componentRef?: Ref<HTMLInputElement>;
  error?: FieldError;
  label: string;
  name: string;
}
