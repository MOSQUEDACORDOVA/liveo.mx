import { OutlinedInputProps } from "@mui/material";

export interface PasswordFieldProps extends OutlinedInputProps {
  label: string;
  name: string;
  size?: "small" | "medium";
  onInputUpdated?: (name: string, value?: string | null) => void;
  value?: string | null;
  required?: boolean;
  helperText?: string;
}
