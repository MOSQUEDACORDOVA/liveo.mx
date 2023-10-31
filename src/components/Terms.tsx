import { PathNames } from "@/config";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const Terms = ({
  onChange,
  className,
}: {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  className?: string;
}) => {
  return (
    <FormControlLabel
      className="text-sm ml-0"
      control={
        <Checkbox
          onChange={onChange}
          size="small"
          sx={{
            color: "#422a79",
            "&.Mui-checked": {
              color: "#422a79",
            },
          }}
        />
      }
      label={
        <p className={twMerge(`text-violet`, className)}>
          He leido y acepto las
          <Link
            className="text-light-violet hover:text-violet"
            to={PathNames.terms}
          >
            {" "}
            condiciones{" "}
          </Link>
          de uso y Privacidad *
        </p>
      }
    />
  );
};
