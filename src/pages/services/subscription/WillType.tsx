import { useEffect, useState } from "react";
import { HeaderServiceInsideIcon } from "../components";
import { Paragraph } from "@/layout";
import { Sanitize, Title } from "@/components";
import { TextArea } from "@/components/material_ui";
import { IInitialFormValues } from "./SuscriptionPage";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { selectServiceInfo } from "@/features/Service";
import { INPUTNAMES, INPUTPLACEHOLDERS } from "@/utils";

export const initialFormValuesWillType = {
  [INPUTNAMES.WILL]: { value: "", error: false },
};

export const WillType = ({
  onInputUpdated,
}: {
  onInputUpdated: (form: IInitialFormValues) => void;
}) => {
  const serviceInfo = useSelector(selectServiceInfo);
  const [formValues, setFormValues] = useState<IInitialFormValues>(
    initialFormValuesWillType
  );

  const handleInputValues = (
    name: string,
    value: Dayjs | null | string,
    error?: boolean
  ) => {
    setFormValues((prev) => ({ ...prev, [name]: { value, error } }));
  };

  useEffect(() => {
    if (onInputUpdated) {
      onInputUpdated(formValues);
    }
  }, [formValues]);

  return (
    <>
      <div className="flex flex-col gap-6 mb-4">
        <HeaderServiceInsideIcon
          icon={serviceInfo?.logo}
          name={serviceInfo?.name}
        />
        <Paragraph className="text-sm cursor-default">
          <Sanitize html={serviceInfo?.shortDescription} />
        </Paragraph>
      </div>
      <>
        <Title
          title="Ingrese los datos correspondientes"
          color="violet"
          Tag="h5"
        />
        <div className="my-4 grid gap-6">
          <TextArea
            className="border-light-violet/50"
            name={INPUTNAMES.WILL}
            placeholder={INPUTPLACEHOLDERS.WILL}
            minRows={2}
            value={formValues.will?.value}
            onInputUpdated={handleInputValues}
          />
        </div>
      </>
    </>
  );
};
