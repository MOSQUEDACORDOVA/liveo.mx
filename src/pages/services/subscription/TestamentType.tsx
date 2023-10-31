/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { HeaderServiceInsideIcon } from "../components";
import { Paragraph } from "@/layout";
import { Sanitize, Title } from "@/components";
import { DateField, SelectC, TimeField } from "@/components/material_ui";
import { IInitialFormValues } from "./SuscriptionPage";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { selectServiceInfo } from "@/features/Service";
import { selectNotarys } from "@/features/Empresas";
import { INPUTLABELS, INPUTNAMES } from "@/utils";

export const initialFormValuesTestamentType: IInitialFormValues = {
  [INPUTNAMES.DATE]: { value: null, error: false },
  [INPUTNAMES.TIME]: { value: null, error: false },
  [INPUTNAMES.NOTARIES]: { value: "", error: false },
  [INPUTNAMES.SELECT_TESTAMENT_TYPE]: { value: "", error: false },
};

export const TESTAMENT_TYPE = {
  ACCEPTANCE: "Aceptación",
  INHERITANCE: "Herencia",
  ADVANCE_DIRECTIVE: "Voluntad anticipada",
} as const;

export type ITESTAMENT_TYPE =
  (typeof TESTAMENT_TYPE)[keyof typeof TESTAMENT_TYPE];

const SELECT_OPTIONS_SERVICE_TYPE = [
  TESTAMENT_TYPE.ACCEPTANCE,
  TESTAMENT_TYPE.INHERITANCE,
  TESTAMENT_TYPE.ADVANCE_DIRECTIVE,
];

export const TestamentType = ({
  onInputUpdated,
}: {
  onInputUpdated: (form: IInitialFormValues) => void;
}) => {
  const notarys = useSelector(selectNotarys);
  const [notarysName, setNotarysName] = useState<string[]>([]);
  const serviceInfo = useSelector(selectServiceInfo);
  const [formValues, setFormValues] = useState<IInitialFormValues>(
    initialFormValuesTestamentType
  );

  const handleInputValues = (
    name: string,
    value: Dayjs | null | string,
    error?: boolean
  ) => {
    if (name === INPUTNAMES.NOTARIES) {
      const companie = notarys.find((comp) => comp.name === value);
      companie &&
        setFormValues((prev) => ({
          ...prev,
          [name]: { value: companie.id },
        }));
    } else setFormValues((prev) => ({ ...prev, [name]: { value, error } }));
  };

  useEffect(() => {
    notarys.length !== 0 &&
      notarys.map((comp) => setNotarysName((prev) => [...prev, comp.name]));
  }, [notarys]);

  useEffect(() => {
    if (onInputUpdated) {
      onInputUpdated(formValues);
    }
  }, [formValues]);

  const handleOnSelectUpdate = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: { value } }));
  };
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
        <div className="my-4 grid md:grid-cols-3 gap-6">
          <SelectC
            value={formValues[INPUTNAMES.SELECT_TESTAMENT_TYPE]?.value ?? ""}
            onInputUpdated={handleOnSelectUpdate}
            label={INPUTLABELS.SELECT_TESTAMENT_TYPE}
            name={INPUTNAMES.SELECT_TESTAMENT_TYPE}
            options={SELECT_OPTIONS_SERVICE_TYPE}
          />
          <DateField
            onInputUpdated={handleInputValues}
            size="small"
            format="DD/MM/YYYY"
            label={INPUTLABELS.DATE_APPOINTMENT}
            name={INPUTNAMES.DATE}
            value={formValues.date ? formValues.date.value : null}
          />
          <TimeField
            onInputUpdated={handleInputValues}
            size="small"
            ampm={false}
            label={INPUTLABELS.TIME_APPOINTMENT}
            name={INPUTNAMES.TIME}
            value={formValues.time ? formValues.time.value : null}
          />
        </div>
      </>
      <>
        <Title
          title="Notarías a tu servicio"
          color="violet"
          Tag="h5"
          className="mb-4"
        />
        <SelectC
          onInputUpdated={handleInputValues}
          size="small"
          options={notarysName}
          label={INPUTLABELS.NOTARIES}
          name={INPUTNAMES.NOTARIES}
          value={formValues.notaries ? formValues.notaries.value : ""}
        />
      </>
    </>
  );
};
