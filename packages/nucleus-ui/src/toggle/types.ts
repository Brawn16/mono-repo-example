import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";
import { FieldError } from "react-hook-form";

export interface ToggleProps
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
