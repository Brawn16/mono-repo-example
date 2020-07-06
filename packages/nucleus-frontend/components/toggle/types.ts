import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";

export interface ToggleProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  componentRef?: Ref<HTMLInputElement>;
  label: string;
  name: string;
}
