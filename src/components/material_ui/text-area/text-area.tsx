import { TextareaAutosize } from "@mui/material";
import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TextAreaProps as Props } from "./text-area.types";

const TextArea: FC<Props> = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <TextareaAutosize
      className={twMerge(
        "w-full border-black/20 outline-blue-600 border text-sm p-3 rounded-2xl",
        className
      )}
      style={{ borderRadius: 50 }}
      ref={ref}
      {...rest}
    />
  );
});

export default TextArea;
