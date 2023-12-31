import { TextareaAutosize, TextareaAutosizeProps } from "@mui/material";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends TextareaAutosizeProps {
  required?: boolean;
  name: string;
  clear?: boolean;
  onInputUpdated?: (name: string, value: any) => void;
}
export function TextArea({ ...props }: Props) {
  const { clear, required, onInputUpdated, name, className, value, ...rest } =
    props;
  const initialValue = {
    value: "",
    name,
  };
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    onInputUpdated && onInputUpdated(data.name, data.value);
    clear && setData(initialValue);
  }, [data, clear]);

  useEffect(() => {
    value && setData((prev) => ({ ...prev, value: value as string }));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setData({ value, name });
  };
  return (
    <TextareaAutosize
      className={twMerge(
        "w-full border-black/20 outline-blue-600 border text-sm p-3 rounded-2xl",
        className
      )}
      style={{ borderRadius: 50 }}
      onChange={handleChange}
      value={data.value}
      required={required ?? false}
      {...rest}
    />
  );
}
