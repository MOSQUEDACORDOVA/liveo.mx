/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  label: string;
  options: string[];
  name: string;
  value: string;
  size?: "small" | "medium";
  onInputUpdated?: (name: string, value: string) => void;
}

export function SelectC({ ...props }: Props) {
  const { label, options, onInputUpdated, name, size = "small", value } = props;
  const [data, setData] = useState({ value, name: "" });
  useEffect(() => {
    onInputUpdated &&
      data.value !== "" &&
      onInputUpdated(data.name, data.value);
  }, [data]);

  const handleChange = (e: SelectChangeEvent) => {
    const { value, name } = e.target;
    setData({ value, name });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size={size}
          name={name}
          value={data.value}
          label={label}
          onChange={handleChange}
        >
          {options ? (
            options.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
