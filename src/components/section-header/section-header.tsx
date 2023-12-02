import { Paragraph } from "@/layout";
import { FC } from "react";
import { SectionHeaderProps as Props } from "./section-header.types";

const SectionHeader: FC<Props> = (props) => {
  const { title, description, classNameContainer = "" } = props;

  return (
    <div className={`w-full text-center ${classNameContainer}`}>
      <h3 className="text-violet font-bold mb-4">{title}</h3>

      {description && <Paragraph>{description}</Paragraph>}
    </div>
  );
};

export default SectionHeader;
