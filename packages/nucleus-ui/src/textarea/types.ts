import { DetailedHTMLProps, TextareaHTMLAttributes, Ref } from "react";
import { FieldError } from "react-hook-form";

export interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  componentRef?: Ref<HTMLTextAreaElement>;
  error?: FieldError;
  label?: string;
  name: string;
}
