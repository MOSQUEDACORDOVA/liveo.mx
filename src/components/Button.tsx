import { Button as ButtonMUI } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

type IProps = {
  to?: string;
  text: string;
  uppercase?: boolean;
  bgColor?: "light-violet" | "violet" | "white" | "none";
  border?: boolean;
  borderColor?: "light-violet" | "violet" | "white" | "ocean";
  textColor?: "light-violet" | "violet" | "white";
  dataAos?: string;
  full?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  loading?: boolean | null;
  icon?: JSX.Element;
  classNameLink?: string;
  className?: string;
};

export const Button = ({
  text,
  bgColor,
  uppercase,
  to = "",
  border,
  borderColor,
  textColor,
  dataAos,
  full,
  onClick,
  disabled,
  loading = null,
  type,
  icon,
  classNameLink,
  className,
}: IProps) => {
  const [colorB, setColorB] = useState("");
  useEffect(() => {
    switch (borderColor) {
      case "light-violet":
        return setColorB("#b08fde");
      case "violet":
        return setColorB("#422a79");
      case "white":
        return setColorB("#fff");
      case "ocean":
        return setColorB("#80e7ed");
      default:
        break;
    }
  }, [borderColor]);

  return (
    <>
      {loading !== null ? (
        <LoadingButton
          variant="text"
          onClick={onClick}
          disabled={disabled}
          data-aos={dataAos}
          loading={loading}
          type={type ?? "button"}
          sx={{
            border: border ? `1px solid ${colorB}` : "none",
          }}
          className={`${uppercase ? "uppercase" : "normal-case"}
     ${
       !loading &&
       bgColor === "light-violet" &&
       `bg-light-violet hover:bg-light-violet/90`
     }
     ${
       !loading &&
       bgColor === "violet" &&
       `bg-violet hover:bg-violet/90 ${border && "border"}`
     }
    ${
      !loading &&
      bgColor === "white" &&
      `bg-white hover:bg-white/90 ${border && "border"}`
    }
    ${
      !loading &&
      bgColor === "none" &&
      `bg-transparent hover:bg-ocean/50 ${border && "border"}`
    }
      text-white font-semibold rounded-full px-4 ${disabled && "opacity-50"} ${
            full ? "w-full" : "w-fit"
          } z-30 cursor-pointer ${className}`}
        >
          <Link
            className={`${textColor === "light-violet" && `text-light-violet`}
      ${textColor === "violet" && `text-violet`} ${
              textColor === "white" && `text-white`
            }
      ${classNameLink}`}
            to={`${to}`}
          >
            {text}
          </Link>
        </LoadingButton>
      ) : (
        <ButtonMUI
          onClick={onClick}
          disabled={disabled}
          data-aos={dataAos}
          type={type ?? "button"}
          sx={{
            border: border ? `1px solid ${colorB}` : "none",
          }}
          className={`${uppercase ? "uppercase" : "normal-case"}
     ${bgColor === "light-violet" && `bg-light-violet hover:bg-light-violet/90`}
     ${
       bgColor === "violet" &&
       `bg-violet hover:bg-violet/90 ${border && "border"}`
     }
    ${bgColor === "white" && `bg-white hover:bg-white/90 ${border && "border"}`}
      text-white font-semibold rounded-full px-4 ${disabled && "opacity-50"} ${
            full ? "w-full" : "w-fit"
          } ${className}`}
        >
          <Link
            className={`${textColor === "light-violet" && `text-light-violet`}
      ${textColor === "violet" && `text-violet`} ${
              textColor === "white" && `text-white`
            }
      ${classNameLink}`}
            to={`${to}`}
          >
            {icon && icon}
            {text}
          </Link>
        </ButtonMUI>
      )}
    </>
  );
};
