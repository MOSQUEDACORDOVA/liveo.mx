import React, { ReactNode, useEffect, useState } from "react";
import { Checkbox as CheckboxComponent } from "@mui/material";
import { FormControlLabel } from "@mui/material";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium" | undefined;
  onInputUpdated?: (text: boolean, name: string) => void;
  children?: ReactNode;
}

export function Checkbox({ ...props }: Props) {
  const { label, onInputUpdated, name, size, children } = props;
  const [data, setData] = useState({ value: false, name: "" });
  useEffect(() => {
    onInputUpdated && data.value && onInputUpdated(data.value, data.name);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setData((prev) => (prev = { ...prev, value: checked, name }));
  };

  return (
    <div className="flex gap-2">
      <FormControlLabel
        className="text-black/80"
        control={
          <CheckboxComponent
            checked={data.value}
            size={size ? size : "medium"}
            onChange={handleChange}
            name={name}
          />
        }
        label={label}
      />
      {children}
    </div>
  );
}
