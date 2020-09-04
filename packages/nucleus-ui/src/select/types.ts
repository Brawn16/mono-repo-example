import { DetailedHTMLProps, Ref, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  componentRef?: Ref<HTMLSelectElement>;
  error?: FieldError;
  help?: string;
  label?: string;
  name: string;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}
