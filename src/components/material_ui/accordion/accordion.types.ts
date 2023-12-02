export interface AccordionProps {
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
}
