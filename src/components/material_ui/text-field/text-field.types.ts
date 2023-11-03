import { BaseTextFieldProps } from "@mui/material";

export interface TextFieldProps extends BaseTextFieldProps {
  type?: string;
  label: string;
  required?: boolean;
  name: string;
  className?: string;
  clear?: boolean;
  size?: "small" | "medium";
  onInputUpdated?: (name: string, value: any) => void;
  value?: string | null | undefined;
  disabled?: boolean;
}
