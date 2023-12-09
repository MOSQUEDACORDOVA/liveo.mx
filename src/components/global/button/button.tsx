import { LoadingButton } from "@mui/lab";
import { FC } from "react";
import { ButtonProps as Props } from "./button.types";

const Button: FC<Props> = (props) => {
  const {
    children,
    loading,
    bgColor,
    border,
    className,
    disabled,
    full,
    ...rest
  } = props;

  return (
    <LoadingButton
      {...rest}
      className={` normal-case
  ${
    !loading &&
    bgColor === "light-violet" &&
    `bg-light-violet hover:bg-light-violet/90`
  }
  ${
    !loading &&
    bgColor === "violet" &&
    `bg-violet hover:bg-violet/90 ${border && "border"}`
  }
 ${
   !loading &&
   bgColor === "white" &&
   `bg-white hover:bg-white/90 ${border && "border"}`
 }
 ${
   !loading &&
   bgColor === "none" &&
   `bg-transparent hover:bg-ocean/50 ${border && "border"}`
 }
   text-white font-semibold rounded-full px-4 ${disabled && "opacity-50"} ${
        full ? "w-full" : "w-fit"
      } z-30 cursor-pointer ${className}`}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
