import { Button, EmptyList, FileZone, Title } from "@/components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/features/store";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { Paragraph, Suspense } from "@/layout";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Modal } from "@mui/material";
import {
  IGetBys,
  deleteTestamentFile,
  getBys,
  getTestament,
  selectBysInfo,
  selectTestamentInfo,
  selectTestamentLoading,
  setTestamentFile,
} from "@/features/Service";
import { SelectC } from "@/components/material_ui";
import {
  ITESTAMENT_TYPE,
  TESTAMENT_TYPE,
} from "@/pages/services/subscription/TestamentType";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { toast } from "react-toastify";

const FILE_NAMES = {
  ID: "identificación oficial",
  BILL: "comprobante domiciliario",
  FORMAT: "formato",
} as const;

export const DocumentTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [document, setDocument] = useState<File | null>(null);
  const testament = useSelector(selectTestamentInfo);
  const testament_loading = useSelector(selectTestamentLoading);
  const bys = useSelector(selectBysInfo);
  const [notarysName, setNotarysName] = useState<string[]>([]);
  const [testamentTypeSelected, setTestamentTypeSelected] =
    useState<ITESTAMENT_TYPE>();
  const [notarySelected, setnotarySelected] = useState("");
  const [idTestamentSelected, setidTestamentSelected] = useState("");
  const [fileName, setFileName] = useState("");

  const onLoadDocument = (file: File) => {
    setDocument(file);
  };

  useEffect(() => {
    if (testamentTypeSelected && notarySelected !== "") {
      const selectedTestament = bys?.find(
        (item) =>
          item.obj.empresa.name === notarySelected &&
          item.tipo === testamentTypeSelected
      );
      if (selectedTestament) {
        setidTestamentSelected(selectedTestament?.id_testamento);
        dispatch(getTestament(selectedTestament?.id_testamento));
      }
      !selectedTestament &&
        toast.error(
          "No hay ninguna subscripción actualmente con los datos proporcionados"
        );
    }
  }, [notarySelected, testamentTypeSelected]);

  const handleSendFile = () => {
    document &&
      dispatch(
        setTestamentFile({
          file: document,
          id_testament: idTestamentSelected,
          file_name: fileName,
        })
      )
        .unwrap()
        .then(() =>
          dispatch(getBys())
            .unwrap()
            .then(() => dispatch(getTestament(idTestamentSelected)))
            .then(() => setDocument(null))
        );
  };

  const handledeleteFile = async () =>
    await dispatch(
      deleteTestamentFile({
        id_testament: idTestamentSelected,
        file: fileName.slice(-1),
      })
    )
      .unwrap()
      .then(() => dispatch(getTestament(idTestamentSelected)))
      .then(() => {
        setVerificationModal(false);
        setDocument(null);
      });

  const handleOnDelete = (name: string) => {
    handleNamesToSendFile(name);
    setVerificationModal(true);
  };

  const [verificationModal, setVerificationModal] = useState(false);

  const Files = [
    {
      name: FILE_NAMES.ID,
      url: testament?.archivo1,
    },
    {
      name: FILE_NAMES.BILL,
      url: testament?.archivo2,
    },
    {
      name: FILE_NAMES.FORMAT,
      url: testament?.archivo3,
    },
  ];

  const SELECT_OPTIONS_TESTAMENT_TYPE = [
    TESTAMENT_TYPE.ACCEPTANCE,
    TESTAMENT_TYPE.INHERITANCE,
    TESTAMENT_TYPE.ADVANCE_DIRECTIVE,
  ];

  const handleOnSelectUpdate = (name: string, value: any) => {
    if (INPUTNAMES.SELECT_TESTAMENT_TYPE === name)
      return setTestamentTypeSelected(value);
    if (INPUTNAMES.NOTARIES === name) return setnotarySelected(value);
  };

  const [titleUploadDocument, setTitleUploadDocument] = useState("");

  const handleNamesToSendFile = (name: string) => {
    if (FILE_NAMES.ID === name) return setFileName("archivo1");
    if (FILE_NAMES.BILL === name) return setFileName("archivo2");
    if (FILE_NAMES.FORMAT === name) return setFileName("archivo3");
  };

  const handleTitleUploadDocument = (
    index: number,
    name: string,
    url?: string
  ) => {
    if (index === 0 && url === "") {
      handleNamesToSendFile(name);
      return setTitleUploadDocument(`Subir ${name}`);
    } else if (
      index !== 0 &&
      Files[index - 1].url !== "" &&
      url === "" &&
      Files[0].url !== ""
    ) {
      handleNamesToSendFile(name);
      return setTitleUploadDocument(`Subir ${name}`);
    }
  };

  useEffect(() => {
    if (testament) {
      Files.map((item, index) =>
        handleTitleUploadDocument(index, item.name, item.url)
      );
    }
    dispatch(getBys())
      .unwrap()
      .then((resp) => {
        resp.map((testament: IGetBys) => {
          if (
            testament.obj.archivo1 === "" ||
            testament.obj.archivo2 === "" ||
            testament.obj.archivo3 === ""
          ) {
            const isInNotarys = notarysName.find(
              (item) => item === testament.obj.empresa.name
            );
            !isInNotarys &&
              setNotarysName((prev) => [...prev, testament.obj.empresa.name]);
          }
        });
      });
    handleTitleButton();
  }, [testament]);

  const handleFinishProces = () =>
    Files.map((item) => item.url === "").every((item) => item === false);

  const [buttonTitle, setButtonTitle] = useState(false);

  const handleTitleButton = () => {
    let count = 0;
    Files.map((item, index) => {
      if (item.url === "") count += 1;
      if (index === Files.length - 1 && count === 1)
        return setButtonTitle(true);
      else return setButtonTitle(false);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Modal
        open={verificationModal}
        onClose={() => setVerificationModal(false)}
        className="flex justify-center items-center"
      >
        <div className="bg-white rounded-2xl relative p-6">
          <IconButton
            onClick={() => setVerificationModal(false)}
            className="absolute right-2 top-2 z-10"
          >
            <CloseRoundedIcon />
          </IconButton>
          <div className="flex flex-col gap-6 m-6">
            <Title
              title="¿Quieres eliminar este archivo?"
              Tag="h6"
              color="light-violet"
            />
            <div className="flex gap-6">
              <Button
                classNameLink="min-w-[100px]"
                bgColor="light-violet"
                text="Borrar"
                onClick={handledeleteFile}
              />
              <Button
                classNameLink="min-w-[100px]"
                bgColor="none"
                text="Cancelar"
                border
                borderColor="light-violet"
                textColor="light-violet"
                onClick={() => setVerificationModal(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="grid md:grid-cols-2 gap-4">
        <SelectC
          onInputUpdated={handleOnSelectUpdate}
          size="small"
          options={notarysName}
          label={INPUTLABELS.NOTARIES}
          name={INPUTNAMES.NOTARIES}
          value={notarySelected}
        />
        <SelectC
          value={testamentTypeSelected ?? ""}
          onInputUpdated={handleOnSelectUpdate}
          label={INPUTLABELS.SELECT_TESTAMENT_TYPE}
          name={INPUTNAMES.SELECT_TESTAMENT_TYPE}
          options={SELECT_OPTIONS_TESTAMENT_TYPE}
        />
      </div>
      {testamentTypeSelected && notarySelected !== "" && testament ? (
        <>
          <div
            className={`${
              !handleFinishProces() && "select-none"
            } flex relative group flex-col gap-4 items-center justify-center h-52 border border-light-violet border-dashed p-6 rounded-xl w-full`}
          >
            {document || handleFinishProces() ? (
              <Suspense
                loading={testament_loading}
                type="circular"
                className="flex flex-col items-center justify-center min-h-max gap-4"
              >
                <CheckCircleIcon className="w-14 h-14 text-green-500" />
                <Title
                  title={
                    handleFinishProces()
                      ? "Proceso terminado satisfactoriamente"
                      : "Documento subido correctamente"
                  }
                  Tag="h5"
                  color="ocean"
                />
              </Suspense>
            ) : (
              <Suspense
                loading={testament_loading}
                type="circular"
                className="flex flex-col items-center justify-center min-h-max gap-4"
              >
                <CloudUploadIcon className="w-14 h-14 text-violet group-hover:animate-bounce" />
                <Title
                  title={titleUploadDocument}
                  Tag="h5"
                  color="ocean"
                  className="group-hover:animate-bounce delay-200"
                />
              </Suspense>
            )}
            <FileZone
              disabled={handleFinishProces()}
              onLoadFile={onLoadDocument}
              name="documment"
              accept=".doc,.docx, .pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>
          {!handleFinishProces() && (
            <Button
              onClick={handleSendFile}
              text={buttonTitle ? "Finalizar" : "Guardar"}
              bgColor="light-violet"
              className="w-20 self-center"
              uppercase
              disabled={!document || testament_loading}
            />
          )}

          <ul className="flex gap-6 justify-start w-full flex-wrap">
            {Files.length !== 0 ? (
              Files.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 &&
                    Files[index - 1].url === "" &&
                    Files[index].url === ""
                      ? "select-none opacity-50 outline-none"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  } relative cursor-default w-[165px] h-[136px] p-4 bg-light-gray rounded-xl  duration-300`}
                >
                  <Suspense
                    loading={testament_loading}
                    type="circular"
                    className="flex flex-col items-center justify-center min-h-max"
                  >
                    {item.url !== "" ? (
                      <TaskRoundedIcon className="w-16 h-16 text-green-600 self-center" />
                    ) : (
                      <UploadFileRoundedIcon className="w-16 h-16 text-red-600 self-center" />
                    )}
                    <Paragraph
                      // eslint-disable-next-line no-irregular-whitespace
                      children={item.name}
                      className="text-sm text-center first-letter:uppercase"
                    />
                    <IconButton
                      disabled={
                        (index !== 0 &&
                          Files[index - 1].url === "" &&
                          Files[index].url === "") ||
                        item.url === ""
                      }
                      onClick={() => handleOnDelete(item.name)}
                      className="absolute top-1 right-1 z-10"
                    >
                      <CloseRoundedIcon className="w-5 h-5" />
                    </IconButton>
                  </Suspense>
                </div>
              ))
            ) : (
              <EmptyList message="Actualmente no tiene ningún archivo" />
            )}
          </ul>
        </>
      ) : (
        <EmptyList message="Seleccione los datos correspondientes" />
      )}
    </div>
  );
};
