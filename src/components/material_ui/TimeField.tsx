import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField as TimeFieldComponent } from "@mui/x-date-pickers/TimeField";
import { TimeValidationError } from "@mui/x-date-pickers";

interface Props {
  label: string;
  name: string;
  size?: "small" | "medium";
  value: Dayjs | null;
  ampm?: boolean;
  onInputUpdated?: (
    name: string,
    value: Dayjs | null | string,
    error: boolean
  ) => void;
}
interface dataProps {
  value: Dayjs | null;
  name: string;
  error: TimeValidationError | boolean;
}

export function TimeField({ ...props }: Props) {
  const { label, name, onInputUpdated, size, value, ampm = true } = props;
  const [data, setData] = useState<dataProps>({
    value,
    name: name,
    error: false,
  });
  useEffect(() => {
    if (onInputUpdated && data.value !== null) {
      const error =
        data.error ===
        ("minutesStep" ||
          "minTime" ||
          "maxTime" ||
          "shouldDisableClock-hours" ||
          "shouldDisableClock-minutes" ||
          "shouldDisableClock-seconds" ||
          "shouldDisableTime-hours" ||
          "shouldDisableTime-minutes" ||
          "shouldDisableTime-seconds");
      onInputUpdated(data.name, data.value, error);
    }
  }, [data]);

  const handleChange = (newValue: Dayjs | null) => {
    setData((prev) => (prev = { ...prev, value: newValue }));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeFieldComponent
        className="w-full"
        ampm={ampm}
        onError={(error) => setData((prev) => (prev = { ...prev, error }))}
        size={size}
        label={label}
        value={data.value}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
}
