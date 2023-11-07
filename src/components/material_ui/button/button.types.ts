import { ButtonBaseProps } from "@mui/material";

export interface ButtonProps extends Omit<ButtonBaseProps, "color"> {
  to?: string;
  text: string;
  uppercase?: boolean;
  bgColor?: "light-violet" | "violet" | "white" | "none";
  border?: boolean;
  borderColor?: "light-violet" | "violet" | "white" | "ocean";
  textColor?: "light-violet" | "violet" | "white";
  dataAos?: string;
  full?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  loading?: boolean | null;
  icon?: JSX.Element;
  classNameLink?: string;
  className?: string;
}
