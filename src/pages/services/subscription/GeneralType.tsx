import { HeaderServiceInsideIcon } from "../components";
import { Paragraph } from "@/layout";
import { Sanitize } from "@/components";
import { useSelector } from "react-redux";
import { selectServiceInfo } from "@/features/Service";

export const GeneralType = () => {
  const serviceInfo = useSelector(selectServiceInfo);
  return (
    <div className="flex flex-col gap-6 mb-4">
      <HeaderServiceInsideIcon
        icon={serviceInfo?.logo}
        name={serviceInfo?.name}
      />
      <Paragraph className="text-sm cursor-default">
        <Sanitize html={serviceInfo?.shortDescription} />
      </Paragraph>
    </div>
  );
};
