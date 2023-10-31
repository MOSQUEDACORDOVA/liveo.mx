import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";

interface Props {
  label: string;
  name: string;
  size?: "small" | "medium";
  onInputUpdated?: (name: string, value?: string | null) => void;
  value?: string | null;
  required?: boolean;
}
export function PasswordField({ ...props }: Props) {
  const {
    label,
    onInputUpdated,
    name,
    size = "small",
    value,
    required,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState({
    value: value !== null ? value : "",
    name: "",
  });

  useEffect(() => {
    if (data.value && data.value.length < 6) {
      setError(true);
      setMessageError("La contraseña no es válida");
    } else {
      setError(false);
      setMessageError("");
    }
  }, [data]);

  useEffect(() => {
    onInputUpdated && onInputUpdated(data.name, data.value);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData({ value, name });
  };
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
        onChange={handleChange}
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
      />
      <FormHelperText error={error}>{messageError}</FormHelperText>
    </FormControl>
  );
}
