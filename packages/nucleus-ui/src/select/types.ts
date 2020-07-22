import { Ref } from "react";
import { FieldError } from "react-hook-form";
import { Props } from "react-select";

export interface OptionType {
  label: string;
  value: string;
}

export interface SelectProps extends Props {
  componentRef?: Ref<HTMLInputElement>;
  error?: FieldError;
  label?: string;
  name: string;
  required?: boolean;
}
