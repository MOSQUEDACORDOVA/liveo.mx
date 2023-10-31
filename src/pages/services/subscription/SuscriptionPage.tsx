/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Tabs, Title } from "@/components";
import { Paragraph, Single70PercentPage, Suspense } from "@/layout";
import { useEffect, useState } from "react";
import { HeaderServiceInsideIcon } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  IBy,
  ILetterServiceData,
  ISocialMedia,
  ITestament,
  IWillServiceData,
  getServiceById,
  selectServiceInfo,
  selectServiceLoading,
  selectServiceSubsByLoading,
  selectServiceSubsLoading,
  setBy,
  setLetter,
  setSocialMedia,
  setTestament,
  setWill,
} from "@/features/Service";
import { AppDispatch } from "@/features/store";
import { PathNames, service } from "@/config";
import { useScrollToTop } from "@/hook";

import { getNotarys } from "@/features/Empresas";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { Alert, Divider } from "@mui/material";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  TESTAMENT_TYPE,
  TestamentType,
  initialFormValuesTestamentType,
} from "./TestamentType";
import {
  INPUTNAMES,
  SERVICE_TYPE,
  TABSID,
  handleCompareSameNestedObject,
  handleSomeIsEmpty,
} from "@/utils";
import { GeneralType, LetterType, SocialMediaType, WillType } from ".";
import { setProfileActiveTab } from "@/features/LoginRegisterUser";
import { toast } from "react-toastify";
import { IRADIOVALUES, PayMethods, RADIOVALUES } from "@/components/PayMethods";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

const TabsName = {
  service: "Mis servicios",
  pay_method: "Método de Pago",
  subscription_resume: "Resumen de suscripción",
} as const;

export type ITabName = (typeof TabsName)[keyof typeof TabsName];

type IStringValues = { value: string; error?: boolean };

export type IInitialFormValues = {
  [x: string]: any;
  [INPUTNAMES.DATE]?: { value: Dayjs | null; error: boolean };
  [INPUTNAMES.TIME]?: { value: Dayjs | null; error: boolean };
  [INPUTNAMES.NOTARIES]?: IStringValues;
  [INPUTNAMES.WILL]?: IStringValues;
  [INPUTNAMES.LETTER_TO_NAME]?: IStringValues;
  [INPUTNAMES.LETTER_TO_SURNAME]?: IStringValues;
  [INPUTNAMES.LETTER_TO_ALIAS]?: IStringValues;
  [INPUTNAMES.LETTER_TO_RELATION]?: IStringValues;
  [INPUTNAMES.LETTER_COMMENTS]?: IStringValues;
  [INPUTNAMES.LETTER_MESSAGE]?: IStringValues;
  [INPUTNAMES.SOCIAL_MEDIA_FACEBOOK]?: IStringValues;
  [INPUTNAMES.SOCIAL_MEDIA_TIKTOK]?: IStringValues;
  [INPUTNAMES.SOCIAL_MEDIA_INSTAGRAM]?: IStringValues;
  [INPUTNAMES.SELECT_TESTAMENT_TYPE]?: IStringValues;
};

export const SuscriptionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectServiceLoading);
  const subsByLoading = useSelector(selectServiceSubsByLoading);
  const serviceInfo = useSelector(selectServiceInfo);
  const subsLoading = useSelector(selectServiceSubsLoading);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [formValues, setFormValues] = useState<IInitialFormValues>();
  const [type_testament, setType_testament] = useState<string | undefined>("");
  const [idTestament, setIdTestament] = useState("");

  const TabsData = [
    { name: TabsName.service, disabled: false },
    { name: TabsName.pay_method, disabled: true },
    { name: TabsName.subscription_resume, disabled: true },
  ];

  const { handleScrollToTop } = useScrollToTop();
  useEffect(() => handleOnLoad(), []);

  const handleOnLoad = () => {
    handleScrollToTop();
    dispatch(getServiceById(serviceInfo?.id ?? service));
    dispatch(getNotarys());
  };

  const handleActiveTab = (active: number) => {
    setActiveTab(active);
  };

  const handleValidateServices = () => {
    if (activeTab === 0 && formValues) {
      if (
        serviceInfo?.type === SERVICE_TYPE.TESTAMENT &&
        !handleCompareSameNestedObject(
          formValues,
          initialFormValuesTestamentType
        )
      ) {
        const formattedDate = dayjs(
          formValues[INPUTNAMES.DATE]?.value
        ).isValid();
        const formatedTime = dayjs(
          formValues[INPUTNAMES.TIME]?.value
        ).isValid();
        return (
          formattedDate &&
          formatedTime &&
          formValues[INPUTNAMES.NOTARIES]?.value !== "" &&
          formValues[INPUTNAMES.SELECT_TESTAMENT_TYPE]?.value !== ""
        );
      } else if (
        serviceInfo?.type === SERVICE_TYPE.WILL &&
        handleSomeIsEmpty(formValues)
      ) {
        return formValues[INPUTNAMES.WILL]?.value !== "";
      } else if (
        serviceInfo?.type === SERVICE_TYPE.LETTER &&
        handleSomeIsEmpty(formValues)
      ) {
        const all_no_empty =
          formValues[INPUTNAMES.LETTER_TO_NAME]?.value !== "" &&
          formValues[INPUTNAMES.LETTER_TO_SURNAME]?.value !== "" &&
          formValues[INPUTNAMES.LETTER_TO_ALIAS]?.value !== "" &&
          formValues[INPUTNAMES.LETTER_TO_RELATION]?.value !== "" &&
          formValues[INPUTNAMES.LETTER_COMMENTS]?.value !== "" &&
          formValues[INPUTNAMES.LETTER_MESSAGE]?.value !== "";
        return all_no_empty;
      } else if (
        serviceInfo?.type === SERVICE_TYPE.SOCIAL_MEDIA &&
        handleSomeIsEmpty(formValues)
      ) {
        const all_no_empty =
          formValues[INPUTNAMES.SOCIAL_MEDIA_FACEBOOK]?.value !== "" &&
          formValues[INPUTNAMES.SOCIAL_MEDIA_INSTAGRAM]?.value !== "" &&
          formValues[INPUTNAMES.SOCIAL_MEDIA_TIKTOK]?.value !== "";
        return all_no_empty;
      } else return true;
    } else return true;
  };
  useEffect(() => {
    if (formValues) handleMessage();
  }, [formValues]);

  const handleContinue = () => {
    handleMessage();
    if (handleValidateServices()) {
      handleWill();
      handleLetter();
      handleTestament();
      handleSocialMedia();

      handleSubBy();
    }
  };

  const handleSubBy = () => {
    if (activeTab === 1) {
      const data: IBy = {
        servicio_id: serviceInfo?.id,
        monto: TotalCalc,
        fecha_inicio: dayjs().format("YYYY-MM-DD"),
        id_metodo_pago: handleIDRadio(radioValue),
        tipo: type_testament,
        id_testamento: idTestament,
      };
      dispatch(setBy(data))
        .unwrap()
        .then(() => setActiveTab(2))
        .then(
          () =>
            serviceInfo?.type === SERVICE_TYPE.TESTAMENT &&
            toast.info(
              "Para finalizar la subscripción debe subir sus documentos"
            )
        );
    }
  };

  useEffect(() => {
    formValues &&
      formValues[INPUTNAMES.SELECT_TESTAMENT_TYPE]?.value &&
      setType_testament(formValues[INPUTNAMES.SELECT_TESTAMENT_TYPE]?.value);
  }, [formValues]);

  const handleLetter = () => {
    if (serviceInfo?.type === SERVICE_TYPE.LETTER && formValues) {
      if (activeTab === 0) {
        const data: ILetterServiceData = {
          para_nombre: formValues[INPUTNAMES.LETTER_TO_NAME]?.value,
          para_apellido: formValues[INPUTNAMES.LETTER_TO_SURNAME]?.value,
          para_alias: formValues[INPUTNAMES.LETTER_TO_ALIAS]?.value,
          para_relacion: formValues[INPUTNAMES.LETTER_TO_RELATION]?.value,
          comentario: formValues[INPUTNAMES.LETTER_COMMENTS]?.value,
          cuerpo: formValues[INPUTNAMES.LETTER_MESSAGE]?.value,
        };
        dispatch(setLetter(data))
          .unwrap()
          .then(() => setActiveTab(1));
      }
    }
  };

  const handleTestament = () => {
    if (serviceInfo?.type === SERVICE_TYPE.TESTAMENT && formValues) {
      if (activeTab === 0) {
        const data: ITestament = {
          empresa_id: formValues[INPUTNAMES.NOTARIES]?.value,
          fecha_cita: dayjs(formValues[INPUTNAMES.DATE]?.value).format(
            "YYYY-MM-DD"
          ),
          hora: dayjs(formValues[INPUTNAMES.TIME]?.value).format("HH:mm:ss"),
          tipo: formValues[INPUTNAMES.SELECT_TESTAMENT_TYPE]?.value,
        };
        dispatch(setTestament(data))
          .unwrap()
          .then((resp) => {
            setIdTestament(resp.id);
            setActiveTab(1);
          });
      }
    }
  };

  const handleSocialMedia = () => {
    if (serviceInfo?.type === SERVICE_TYPE.SOCIAL_MEDIA && formValues) {
      if (activeTab === 0) {
        const data: ISocialMedia = {
          facebook: formValues[INPUTNAMES.SOCIAL_MEDIA_FACEBOOK]?.value,
          instagram: formValues[INPUTNAMES.SOCIAL_MEDIA_TIKTOK]?.value,
          tiktok: formValues[INPUTNAMES.SOCIAL_MEDIA_INSTAGRAM]?.value,
        };
        dispatch(setSocialMedia(data))
          .unwrap()
          .then(() => setActiveTab(1));
      }
    }
  };
  const handleWill = () => {
    if (serviceInfo?.type === SERVICE_TYPE.WILL && formValues) {
      if (activeTab === 0) {
        const data: IWillServiceData = {
          texto: formValues[INPUTNAMES.WILL]?.value,
        };
        dispatch(setWill(data))
          .unwrap()
          .then(() => setActiveTab(1));
      }
    }
  };

  const handleIDRadio = (value: IRADIOVALUES) => {
    if (value === RADIOVALUES.DEBIT_CARD_PAY) return 1;
    if (value === RADIOVALUES.ELECTRONIC_PAY) return 2;
    if (value === RADIOVALUES.PAYPAL_PAY) return 3;
    if (value === RADIOVALUES.FREE_SUB) return 4;
  };

  const [message, setMessage] = useState("");

  const handleMessage = () => {
    handleValidateServices()
      ? setMessage("")
      : setMessage("Faltan campos por llenar");
  };

  const handleCancelChange = () => {
    navigate(-1);
  };

  const handlePriceDisabled = () =>
    serviceInfo?.price_month ? Number(serviceInfo?.price_month) > 0 : false;

  const [radioValue, setRadioValue] = useState<IRADIOVALUES>(
    !handlePriceDisabled() ? RADIOVALUES.FREE_SUB : RADIOVALUES.DEBIT_CARD_PAY
  );

  const TotalCalc = (
    Number(serviceInfo?.price_month) +
    Number(serviceInfo?.price_month) * Number(0.16)
  ).toFixed(2);

  const dataTableSubscriptionResume = [
    `#${serviceInfo?.id}`,
    dayjs().format("DD/MM/YYYY"),
    `$${TotalCalc}`,
    radioValue,
  ];

  const dataTableQtyServices = [
    <HeaderServiceInsideIcon
      icon={serviceInfo?.logo}
      name={serviceInfo?.name}
    />,
    1,
    !handlePriceDisabled() ? "-" : `$${TotalCalc}`,
  ];

  const handleFormvaluesInTypesService = (form: IInitialFormValues) =>
    setFormValues(form);

  const handleUploadDocuments = () => {
    dispatch(setProfileActiveTab(TABSID.DOCUMENTS_PROFILE));
    navigate(PathNames.private.profile);
  };

  const handleOnChangeRadio = (radio: IRADIOVALUES) => setRadioValue(radio);

  const handle_url = () => {
    if (type_testament === TESTAMENT_TYPE.ACCEPTANCE)
      return serviceInfo?.pdf_acceptance;
    if (type_testament === TESTAMENT_TYPE.ADVANCE_DIRECTIVE)
      return serviceInfo?.pdf_advance_directive;
    if (type_testament === TESTAMENT_TYPE.INHERITANCE)
      return serviceInfo?.pdf_inheritance;
  };

  const downloadPDF = () => {
    const url = handle_url();
    if (url) {
      const anchor = document.createElement("a");
      anchor.setAttribute("href", url);
      anchor.setAttribute("download", "Mi testamento");
      anchor.click();
    }
  };

  return (
    <Single70PercentPage className="pb-60">
      <div className="mt-6">
        <Title title="Resumen de suscripción" color="violet" className="mb-4" />
        <Tabs
          tabs={TabsData}
          divider
          handleActiveTab={handleActiveTab}
          value={activeTab}
        />
      </div>
      {/* SERVICE */}
      {activeTab === 0 && (
        <Suspense loading={loading} type="linear">
          {serviceInfo?.type === SERVICE_TYPE.TESTAMENT && (
            <TestamentType onInputUpdated={handleFormvaluesInTypesService} />
          )}
          {serviceInfo?.type === SERVICE_TYPE.WILL && (
            <WillType onInputUpdated={handleFormvaluesInTypesService} />
          )}
          {serviceInfo?.type === SERVICE_TYPE.LETTER && (
            <LetterType onInputUpdated={handleFormvaluesInTypesService} />
          )}
          {serviceInfo?.type === SERVICE_TYPE.SOCIAL_MEDIA && (
            <SocialMediaType onInputUpdated={handleFormvaluesInTypesService} />
          )}
          {serviceInfo?.type === SERVICE_TYPE.GENERAL && <GeneralType />}
          <div className="mt-16">
            {message !== "" && (
              <Alert severity={"warning"} className="">
                {message}
              </Alert>
            )}
            <div className="flex justify-end gap-4 xl:mb-60 mt-4">
              <Button
                onClick={handleContinue}
                classNameLink="min-w-[200px] text-xl py-1"
                text="Continuar"
                bgColor="light-violet"
                loading={subsLoading}
              />
              <Button
                onClick={handleCancelChange}
                classNameLink="min-w-[200px] text-xl py-1"
                text="Cancelar"
                border
                textColor="violet"
                borderColor="violet"
                bgColor="white"
              />
            </div>
          </div>
        </Suspense>
      )}
      {/* PAY */}
      {activeTab === 1 && (
        <section className="mb-60 cursor-default">
          <header className="">
            <HeaderServiceInsideIcon
              iconJSX={
                <CreditCardRoundedIcon className="w-16 h-16 shadow-md shadow-light-black rounded-full p-3 text-light-violet" />
              }
              name="Método de Pago"
              not_love
            />
          </header>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <PayMethods
              disabled={handlePriceDisabled()}
              onChangeRadio={handleOnChangeRadio}
            />

            <div className="flex flex-col items-center gap-6">
              <header className="bg-violet rounded-2xl flex items-center justify-center p-6">
                <Title title="Resumen de Suscripción" color="white" Tag="h5" />
              </header>
              <Suspense
                loading={loading}
                type="linear"
                className="flex flex-col items-center gap-6"
              >
                <HeaderServiceInsideIcon
                  icon={serviceInfo?.logo}
                  name={serviceInfo?.name}
                />
                <div className="w-80 flex flex-col gap-1">
                  <span className="flex justify-between">
                    <p className="text-lg font-bold">Subtotal</p>
                    <p className="text-lg font-bold">
                      ${serviceInfo?.price_month}.00
                    </p>
                  </span>
                  <Divider />
                  <span className="flex justify-between">
                    <p className="text-lg font-bold">IVA</p>
                    <p className="text-lg font-bold">$0.16</p>
                  </span>
                </div>
                <span className="flex rounded-full justify-between items-center gap-20 border-2 border-light-violet py-1 px-6">
                  <Title title="Total" color="light-violet" Tag="h5" />
                  <p className="text-light-violet font-bold text-2xl w-[150px]">
                    ${serviceInfo && TotalCalc} MXN
                  </p>
                </span>
                <Button
                  onClick={handleContinue}
                  text="Finalizar servicio"
                  bgColor="light-violet"
                  classNameLink="w-[305px] text-lg"
                  loading={subsByLoading}
                />
              </Suspense>
            </div>
          </div>
        </section>
      )}
      {/* SUSCRIPTION */}
      {activeTab === 2 && (
        <section className="flex flex-col items-center mb-60">
          <header className="flex items-center flex-col">
            <CheckCircleRoundedIcon className="w-40 h-40 text-light-violet" />
            <span className="flex gap-2">
              <h4 className="text-violet font-bold max-w-[600px] text-center">
                ¡Gracias ahora podrá disfrutar de tu servicio en{" "}
                <span className="text-ocean">Liveo</span>!
              </h4>
            </span>
          </header>

          <table className="w-full mt-20 grid grid-cols-2 sm:grid-cols-1 border-b-2 border-violet sm:border-none pb-4 sm:pb-0">
            <thead>
              <tr className="grid sm:grid-cols-4 gap-10 sm:gap-32 sm:border-b-2 sm:border-violet text-left text-violet text-xl font-bold sm:mb-4 sm:pb-4">
                <th>No. Orden</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Método de pago</th>
              </tr>
            </thead>
            <tbody className="grid sm:grid-cols-4 gap-10 sm:gap-32">
              {dataTableSubscriptionResume.map((item, index) => (
                <tr key={index} className="">
                  <td>
                    <Paragraph>
                      {index === 2 && !handlePriceDisabled() ? "-" : item}
                    </Paragraph>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Suspense loading={loading} type="linear">
            <table className="w-full mt-12">
              <thead className="">
                <tr className="grid grid-cols-3 text-white bg-violet rounded-full text-xl py-3 px-4">
                  <th>Servicios</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="grid grid-cols-3 w-full py-3 px-4">
                {dataTableQtyServices.map((item, index) => (
                  <tr key={index} className="flex justify-center items-center">
                    <td className="text-xl font-bold">{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col gap-1 w-full mt-10">
              <Divider className="border mb-10" />
              <span className="flex justify-between text-2xl font-bold">
                <p className="">IVA</p>
                <p className="">{!handlePriceDisabled() ? "-" : "$0.16"}</p>
              </span>
              <span className="flex justify-between text-2xl font-bold">
                <p className="">Subtotal</p>
                <p className="">
                  {!handlePriceDisabled()
                    ? "-"
                    : `${serviceInfo?.price_month}.00 MXN`}
                </p>
              </span>
            </div>
          </Suspense>
          <div className="flex justify-end gap-4 w-full mt-28">
            <Button
              to={PathNames.services}
              onClick={handleContinue}
              classNameLink="min-w-[200px] text-xl py-1"
              text="Ver más servicios"
              bgColor="violet"
              uppercase
            />
            {serviceInfo?.type === SERVICE_TYPE.TESTAMENT && (
              <>
                <Button
                  icon={<FileDownloadRoundedIcon fontSize="large" />}
                  text="Descargar Documento"
                  classNameLink="min-w-[200px] text-xl py-1"
                  bgColor="light-violet"
                  onClick={downloadPDF}
                  uppercase
                />
                <Button
                  onClick={handleUploadDocuments}
                  classNameLink="min-w-[200px] text-xl py-1"
                  text="Sube tus documentos"
                  bgColor="light-violet"
                  uppercase
                />
              </>
            )}
            <Button
              to={PathNames.home}
              classNameLink="min-w-[200px] text-xl py-1"
              text="Cerrar"
              border
              textColor="violet"
              borderColor="violet"
              bgColor="white"
              uppercase
            />
          </div>
        </section>
      )}
    </Single70PercentPage>
  );
};
