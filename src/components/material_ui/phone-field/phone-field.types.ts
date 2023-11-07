import { OutlinedInputProps } from "@mui/material";

export interface PhoneFieldProps extends OutlinedInputProps {
  name: string;
  namePrefix: string;
  defaultValuePrefix?: string;
  label?: string;
  size?: "small" | "medium";
  value?: string | null;
  required?: boolean;
  helperText?: string;
  onChangePrefix?: (value: string) => void;
}
