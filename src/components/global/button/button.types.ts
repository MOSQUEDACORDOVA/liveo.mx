import { LoadingButtonProps } from "@mui/lab";

export interface ButtonProps extends LoadingButtonProps {
  bgColor?: string;
  border?: boolean;
  className?: string;
  full?: boolean;
}
