/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { HeaderServiceInsideIcon } from "../components";
import { Paragraph } from "@/layout";
import { Sanitize, Title } from "@/components";
import { TextArea, TextField } from "@/components/material_ui";
import { IInitialFormValues } from "./SuscriptionPage";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { selectServiceInfo } from "@/features/Service";
import { INPUTLABELS, INPUTNAMES, INPUTPLACEHOLDERS } from "@/utils";

export const initialFormValuesLetterType: IInitialFormValues = {
  [INPUTNAMES.LETTER_TO_NAME]: { value: "", error: false },
  [INPUTNAMES.LETTER_TO_SURNAME]: { value: "", error: false },
  [INPUTNAMES.LETTER_TO_ALIAS]: { value: "", error: false },
  [INPUTNAMES.LETTER_TO_RELATION]: { value: "", error: false },
  [INPUTNAMES.LETTER_COMMENTS]: { value: "", error: false },
  [INPUTNAMES.LETTER_MESSAGE]: { value: "", error: false },
};

export const LetterType = ({
  onInputUpdated,
}: {
  onInputUpdated: (form: IInitialFormValues) => void;
}) => {
  const serviceInfo = useSelector(selectServiceInfo);
  const [formValues, setFormValues] = useState<IInitialFormValues>(
    initialFormValuesLetterType
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
        <div className="my-4 grid sm:grid-cols-2 gap-6">
          <TextField
            label={INPUTLABELS.LETTER_TO_NAME}
            name={INPUTNAMES.LETTER_TO_NAME}
            size="small"
            onInputUpdated={handleInputValues}
          />
          <TextField
            label={INPUTLABELS.LETTER_TO_SURNAME}
            name={INPUTNAMES.LETTER_TO_SURNAME}
            size="small"
            onInputUpdated={handleInputValues}
          />
          <TextField
            label={INPUTLABELS.LETTER_TO_ALIAS}
            name={INPUTNAMES.LETTER_TO_ALIAS}
            size="small"
            onInputUpdated={handleInputValues}
          />
          <TextField
            label={INPUTLABELS.LETTER_TO_RELATION}
            name={INPUTNAMES.LETTER_TO_RELATION}
            size="small"
            onInputUpdated={handleInputValues}
          />
          <TextArea
            className="sm:col-span-2 "
            name={INPUTNAMES.LETTER_COMMENTS}
            placeholder={INPUTPLACEHOLDERS.LETTER_COMMENTS}
            minRows={1}
            onInputUpdated={handleInputValues}
          />
          <TextArea
            className="sm:col-span-2"
            name={INPUTNAMES.LETTER_MESSAGE}
            placeholder={INPUTPLACEHOLDERS.LETTER_MESSAGE}
            minRows={2}
            onInputUpdated={handleInputValues}
          />
        </div>
      </>
    </>
  );
};
