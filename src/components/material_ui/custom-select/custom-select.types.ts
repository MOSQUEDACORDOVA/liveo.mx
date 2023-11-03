import { SelectProps } from "@mui/material";

export interface CustomSelectProps<T> extends SelectProps {
  label: string;
  options: T[];
  name: string;
  size?: "small" | "medium";
  defaultValue: string;
  onInputUpdated?: (name: string, value: string) => void;
  getLabelOption: (option: T) => string;
  getValueOption: (option: T) => string;
  getIdOption: (option: T, index?: number) => string;
}
