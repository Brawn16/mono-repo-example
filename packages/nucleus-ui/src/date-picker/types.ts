import { Ref, ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";

export interface DatePickerProps {
  className?: string;
  componentRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
  error?: FieldError;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  max?: Date;
  min?: Date;
  name: string;
  value?: string;
}
