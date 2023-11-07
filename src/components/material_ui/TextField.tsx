import { validateInput } from "@/config";
import { INPUTNAMES } from "@/utils";
import { TextField as MuiTextField, OutlinedInputProps } from "@mui/material";
import { useEffect, useState } from "react";

interface Props extends OutlinedInputProps {
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
export function TextField(props: Props) {
  const {
    clear,
    type,
    label,
    required,
    onInputUpdated,
    name,
    size = "small",
    className,
    value,
    disabled,
    error: errorParam = false,
  } = props;
  const initialValue = {
    value: "",
    name,
  };

  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(errorParam);
  const [messageError, setMessageError] = useState("");

  const toValidateEmail =
    data.value && validateInput.email.test(data.value.toString());
  const toValidateMobile =
    data.value && validateInput.phone.test(data.value.toString());

  useEffect(() => {
    value && setData((prev) => ({ ...prev, value }));
  }, [value]);

  useEffect(() => {
    if (required) {
      if (name === INPUTNAMES.EMAIL) {
        if (!toValidateEmail && data.value) {
          setError(true);
          setMessageError("El correo electrónico no es válido");
        } else {
          setError(false);
          setMessageError("");
        }
      }
      if (name === INPUTNAMES.CELL_PHONE) {
        if (!toValidateMobile && data.value) {
          setError(true);
          setMessageError("El celular no es válido");
        } else {
          setError(false);
          setMessageError("");
        }
      }
    }
  }, [data]);

  useEffect(() => {
    onInputUpdated && onInputUpdated(data.name, data.value);
    clear && data.value !== "" && setData(initialValue);
  }, [data, clear]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData({ value, name });
  };
  return (
    <MuiTextField
      disabled={disabled}
      className={className}
      sx={{ borderRadius: 50 }}
      fullWidth
      onChange={handleChange}
      value={data.value}
      required={required ?? false}
      label={label}
      name={name}
      error={error}
      helperText={messageError !== "" && messageError}
      variant="outlined"
      size={size}
      type={type ?? "text"}
    />
  );
}
