import { FC, forwardRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { PasswordFieldProps as Props } from "./promotion-field.types";

const PasswordField: FC<Props> = forwardRef((props, ref) => {
  const {
    label,
    name,
    size = "small",
    required,
    error,
    helperText,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl required={required} error={error} fullWidth variant="outlined">
      <InputLabel
        size={size === "small" ? size : "normal"}
        htmlFor="outlined-adornment-password"
      >
        {label ?? "Password"}
      </InputLabel>
      <OutlinedInput
        size={size}
        name={name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        {...rest}
        ref={ref}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
});

export default PasswordField;
