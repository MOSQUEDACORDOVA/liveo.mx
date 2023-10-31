/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { HeaderServiceInsideIcon } from "../components";
import { Paragraph } from "@/layout";
import { Sanitize, Title } from "@/components";
import { TextField } from "@/components/material_ui";
import { IInitialFormValues } from "./SuscriptionPage";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { selectServiceInfo } from "@/features/Service";
import { INPUTLABELS, INPUTNAMES } from "@/utils";

export const initialFormValuesSocialMediaType: IInitialFormValues = {
  [INPUTNAMES.SOCIAL_MEDIA_FACEBOOK]: { value: "", error: false },
  [INPUTNAMES.SOCIAL_MEDIA_TIKTOK]: { value: "", error: false },
  [INPUTNAMES.SOCIAL_MEDIA_INSTAGRAM]: { value: "", error: false },
};

export const SocialMediaType = ({
  onInputUpdated,
}: {
  onInputUpdated: (form: IInitialFormValues) => void;
}) => {
  const serviceInfo = useSelector(selectServiceInfo);
  const [formValues, setFormValues] = useState<IInitialFormValues>(
    initialFormValuesSocialMediaType
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
            label={INPUTLABELS.SOCIAL_MEDIA_FACEBOOK}
            name={INPUTNAMES.SOCIAL_MEDIA_FACEBOOK}
            size="small"
            onInputUpdated={handleInputValues}
          />
          <TextField
            label={INPUTLABELS.SOCIAL_MEDIA_TIKTOK}
            name={INPUTNAMES.SOCIAL_MEDIA_TIKTOK}
            size="small"
            onInputUpdated={handleInputValues}
          />
          <TextField
            label={INPUTLABELS.SOCIAL_MEDIA_INSTAGRAM}
            name={INPUTNAMES.SOCIAL_MEDIA_INSTAGRAM}
            size="small"
            onInputUpdated={handleInputValues}
          />
        </div>
      </>
    </>
  );
};
