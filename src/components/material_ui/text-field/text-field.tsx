import { TextField as MuiTextField } from "@mui/material";
import { FC, forwardRef } from "react";
import { TextFieldProps } from "./text-field.types";

const TextField: FC<TextFieldProps> = forwardRef((props, ref) => {
  const {
    type,
    label,
    required,
    name,
    size = "small",
    className,
    disabled,
    error = false,
    ...rest
  } = props;

  return (
    <MuiTextField
      disabled={disabled}
      className={className}
      sx={{ borderRadius: 50 }}
      fullWidth
      required={required ?? false}
      label={label}
      name={name}
      error={error}
      variant="outlined"
      size={size}
      type={type ?? "text"}
      ref={ref}
      {...rest}
    />
  );
});

export default TextField;
