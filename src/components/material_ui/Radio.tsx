import React, { ReactNode, useEffect, useState } from "react";
import { Radio as RadioComponent } from "@mui/material";
import { FormControlLabel } from "@mui/material";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium" | undefined;
  onInputUpdated?: (name: string, value: string) => void;
  children?: ReactNode;
  value: string;
  disabled?: boolean;
}

export function Radio({ ...props }: Props) {
  const { label, onInputUpdated, name, size, children, value, disabled } =
    props;
  const [data, setData] = useState({ name, value });
  useEffect(() => {
    onInputUpdated && data.value && onInputUpdated(data.value, data.name);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData((prev) => (prev = { ...prev, value }));
  };

  return (
    <div className="flex gap-2 items-center">
      <FormControlLabel
        disabled={disabled}
        className="text-black/80 m-0"
        control={
          <RadioComponent
            value={data.value}
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
