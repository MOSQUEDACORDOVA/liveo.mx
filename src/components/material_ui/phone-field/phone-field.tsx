import { FC, forwardRef } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { PhoneFieldProps as Props } from "./phone-field.types";
import { useController, useFormContext } from "react-hook-form";

const PhoneField: FC<Props> = forwardRef((props, ref) => {
  const {
    label,
    size = "small",
    required,
    error,
    helperText,
    name,
    namePrefix,
    defaultValue,
    defaultValuePrefix,
    onChangePrefix,
    ...rest
  } = props;

  const { setValue } = useFormContext();
  const { field: fieldInput } = useController({ name, defaultValue });
  const { field: fieldPrefix } = useController({
    name: namePrefix,
    defaultValue: defaultValuePrefix,
  });
  const { onBlur: onBlurInput, value: valueInput } = fieldInput;
  const { onBlur: onBlurPrefix, value: valuePrefix } = fieldPrefix;

  return (
    <FormControl required={required} error={error} fullWidth variant="outlined">
      <InputLabel size={"normal"} htmlFor="outlined-adornment-phone">
        {label ?? "Número de teléfono"}
      </InputLabel>
      <OutlinedInput
        size={size}
        type="text"
        label={label}
        startAdornment={
          <InputAdornment position="start">
            <Select
              size={size}
              variant="outlined"
              sx={{
                "& fieldset": {
                  border: "none",
                },
              }}
              value={valuePrefix}
              onChange={(e) => {
                setValue(namePrefix, `${e.target.value}`);
                setValue(name, "", { shouldValidate: true });
              }}
              onBlur={onBlurPrefix}
            >
              <MenuItem value="+52">+52</MenuItem>
              <MenuItem value="+1">+1</MenuItem>
              <MenuItem value="+58">+58</MenuItem>
            </Select>
          </InputAdornment>
        }
        {...rest}
        value={valueInput}
        onChange={(e) =>
          setValue(name, `${e.target.value}`, { shouldValidate: true })
        }
        onBlur={onBlurInput}
        ref={ref}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
});

export default PhoneField;
