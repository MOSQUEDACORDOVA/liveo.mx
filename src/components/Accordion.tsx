import {
  Accordion as AccordionMUI,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

import { useState } from "react";

type IProps = {
  name: string;
  title: string;
  description?: string;
  child?: JSX.Element;
  icon?: JSX.Element;
  className?: string;
  textColor?: "white";
  maxWidth?: number | string;
  classNameContainer?: string;
  expandedNow?: string;
};

export function Accordion({
  description,
  name,
  title,
  icon,
  className,
  textColor,
  maxWidth,
  child,
  classNameContainer,
  expandedNow,
}: IProps) {
  const [expanded, setExpanded] = useState<string | false>(
    expandedNow ?? false
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded === event.isTrusted ? panel : false);
    };

  return (
    <AccordionMUI
      className={`rounded-2xl overflow-hidden m-0 ${classNameContainer}`}
      sx={{ maxWidth: maxWidth }}
      expanded={expanded === name}
      onChange={handleChange(name)}
    >
      <AccordionSummary
        aria-controls={name}
        id={name}
        className={`${className} flex justify-between items-center gap-4`}
        expandIcon={
          icon ? (
            icon
          ) : expanded ? (
            <RemoveIcon className="text-white p-0.5 rounded-full bg-light-violet" />
          ) : (
            <AddIcon className="text-white p-0.5 rounded-full bg-light-violet" />
          )
        }
      >
        <Typography
          className={`${
            textColor === "white" ? "text-white" : "text-black"
          } font-bold text-lg`}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="px-0.5 py-4">
        {description && (
          <Typography className="p-4 pt-0">{description}</Typography>
        )}
        {child && <div className="">{child}</div>}
      </AccordionDetails>
    </AccordionMUI>
  );
}
