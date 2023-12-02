import { Ref, forwardRef, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CustomSelectProps as Props } from "./custom-select.types";
import { MenuItem } from "@mui/material";

const CustomSelect = forwardRef(<T,>(props: Props<T>, ref: Ref<any>) => {
  const {
    label,
    options,
    onInputUpdated,
    size = "small",
    children,
    getLabelOption,
    getValueOption,
    getIdOption,
    defaultValue,
    ...rest
  } = props;

  const getOptions = useCallback(() => {
    return options.map((option, index) => {
      return (
        <MenuItem
          key={getIdOption(option, index)}
          value={getValueOption(option)}
        >
          {getLabelOption(option)}
        </MenuItem>
      );
    });
  }, [options]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size={size}
          label={label}
          defaultValue={defaultValue}
          ref={ref}
          {...rest}
        >
          {getOptions()}
        </Select>
      </FormControl>
    </Box>
  );
});

export default CustomSelect;
