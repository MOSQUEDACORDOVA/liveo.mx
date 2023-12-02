import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useRef, useState } from "react";
import { IEmpresas } from "@/features/Empresas";
import CardProviders from "./common/card-provider/card-provider";

export const Carrousel = ({ options }: { options: IEmpresas[] }) => {
  const carrousel_ref = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState<"prev" | "next" | "both" | null>(
    "prev"
  );
  const el = carrousel_ref?.current;

  const handleDisabled = () => {
    if (el && el?.clientWidth === el?.scrollWidth) {
      return setDisabled("both");
    } else if ((el && el?.scrollLeft === 0) || (el && el?.scrollLeft === 8)) {
      return setDisabled("prev");
    } else if (el && el?.scrollWidth - el?.clientWidth === el?.scrollLeft) {
      return setDisabled("next");
    } else return setDisabled(null);
  };

  useEffect(() => handleDisabled(), [disabled]);

  const handleScrollBy = (left: number) => {
    carrousel_ref.current?.scrollBy({
      left,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    handleScrollBy(-250);
  };
  const handleNext = () => {
    handleScrollBy(250);
  };

  return (
    <div className="relative py-6 px-14">
      <IconButton
        disabled={disabled === "prev" || disabled === "both"}
        onClick={() => handlePrev()}
        className={`${
          disabled === "prev" || disabled === "both"
            ? "bg-light-violet/50"
            : "bg-light-violet"
        } text-white left-2 absolute top-1/2 -translate-y-1/2 z-10`}
      >
        <NavigateBeforeIcon fontSize="small" />
      </IconButton>

      <div
        onScroll={() => handleDisabled()}
        ref={carrousel_ref}
        className="flex gap-5 p-2 rounded-lg overflow-x-scroll scrollbar-hide relative snap-x snap-mandatory"
      >
        {options.map((item, index) => (
          <CardProviders
            name={item.name}
            logo={item.logo}
            image={item.imagen_principal_empresa}
            key={index}
          />
        ))}
      </div>
      <IconButton
        disabled={disabled === "next" || disabled === "both"}
        onClick={() => handleNext()}
        className={`${
          disabled === "next" || disabled === "both"
            ? "bg-light-violet/50"
            : "bg-light-violet"
        } text-white absolute right-2 top-1/2 -translate-y-1/2 z-10`}
      >
        <NavigateNextIcon fontSize="small" />
      </IconButton>
    </div>
  );
};
