import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField as DateFieldComponent } from "@mui/x-date-pickers/DateField";
import { DateValidationError } from "@mui/x-date-pickers";
import { twMerge } from "tailwind-merge";

interface Props {
  label: string;
  name: string;
  maxDate?: Dayjs;
  size?: "small" | "medium";
  format?: string;
  value: Dayjs | null | string;
  onInputUpdated?: (
    name: string,
    value: Dayjs | null | string,
    error: boolean
  ) => void;
  className?: string;
}
interface dataProps {
  value: Dayjs | null;
  name: string;
  error: DateValidationError | boolean;
}

export function DateField({ ...props }: Props) {
  const {
    label,
    name,
    onInputUpdated,
    size,
    value,
    maxDate,
    format,
    className,
  } = props;
  const [data, setData] = useState<dataProps>({
    value: dayjs(value),
    name: name,
    error: false,
  });
  useEffect(() => {
    if (onInputUpdated) {
      const error =
        data.error ===
        ("shouldDisableDate" ||
          "shouldDisableMonth" ||
          "shouldDisableYear" ||
          "minDate" ||
          "maxDate");
      onInputUpdated(data.name, data.value, error);
    }
  }, [data]);

  const handleChange = (newValue: Dayjs | null) => {
    setData((prev) => (prev = { ...prev, value: newValue }));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateFieldComponent
        className={twMerge("w-full", className)}
        format={format}
        onError={(error) => setData((prev) => (prev = { ...prev, error }))}
        maxDate={maxDate}
        size={size}
        label={label}
        value={data.value}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
}
