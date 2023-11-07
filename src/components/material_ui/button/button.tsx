import { Button as ButtonMUI } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonProps as Props } from "./button.types";

export const Button: FC<Props> = (props) => {
  const {
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
    ...rest
  } = props;

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
          data-aos={dataAos}
          sx={{
            border: border ? `1px solid ${colorB}` : "none",
          }}
          className={`${uppercase ? "uppercase" : "normal-case"}
            ${
              bgColor === "light-violet" &&
              `bg-light-violet hover:bg-light-violet/90`
            }
            ${
              bgColor === "violet" &&
              `bg-violet hover:bg-violet/90 ${border && "border"}`
            }
            ${
              bgColor === "white" &&
              `bg-white hover:bg-white/90 ${border && "border"}`
            }
              text-white font-semibold rounded-full px-4 ${
                disabled && "opacity-50"
              } ${full ? "w-full" : "w-fit"} ${className}`}
          type={type}
          {...rest}
        >
          {to ? (
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
          ) : (
            <p
              className={`${textColor === "light-violet" && `text-light-violet`}
      ${textColor === "violet" && `text-violet`} ${
                textColor === "white" && `text-white`
              }
      ${classNameLink}`}
            >
              {icon && icon}
              {text}
            </p>
          )}
        </ButtonMUI>
      )}
    </>
  );
};
