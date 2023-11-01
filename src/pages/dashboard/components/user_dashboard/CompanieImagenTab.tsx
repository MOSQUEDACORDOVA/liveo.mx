import { Button, EmptyList, FileZone, Title } from "@/components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/features/store";
import { deleteFile, setFile } from "@/features/HomeSlice";
import { TOKEN } from "@/config";
import {
  getFiles,
  selectDashboardProfileFiles,
  selectLoginInfo,
} from "@/features/LoginRegisterUser";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import { Paragraph } from "@/layout";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Modal } from "@mui/material";

export const CompanieImagenTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [document, setDocument] = useState<File | null>(null);
  const login_info = useSelector(selectLoginInfo);
  const Files = useSelector(selectDashboardProfileFiles);

  const onLoadDocument = (file: File) => {
    setDocument(file);
  };

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  const handleSendFile = () => {
    document &&
      dispatch(
        setFile({
          file: document,
          token: login_info?.token ? login_info.token : TOKEN,
        })
      )
        .unwrap()
        .then(() => dispatch(getFiles()).then(() => setDocument(null)));
  };

  const handleNameFile = (url: string) => url.split("/").at(-1);

  const handledeleteFile = async () =>
    await dispatch(deleteFile(FileId))
      .unwrap()
      .then(() => setVerificationModal(false));

  const handleOnDelete = (id: string) => {
    setFileId(id);
    setVerificationModal(true);
  };

  const [verificationModal, setVerificationModal] = useState(false);
  const [FileId, setFileId] = useState("");

  return (
    <div className="flex flex-col gap-8 ">
      <h5 className="font-semibold lg:text-left mb-2">
        Mi imagen
      </h5>
      <h6>Adjuntar imagen principal</h6>
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
      <div className="flex relative group flex-col gap-4 items-center justify-center h-52 border border-light-violet border-dashed p-6 rounded-xl w-full">
        {document ? (
          <>
            <CheckCircleIcon className="w-14 h-14 text-green-500" />
            <Title
              title="Documento subido correctamente"
              Tag="h5"
              color="ocean"
            />
          </>
        ) : (
          <>
            <CloudUploadIcon className="w-14 h-14 text-violet group-hover:animate-bounce" />
            <Title
              title="Subir documento"
              Tag="h5"
              color="ocean"
              className="group-hover:animate-bounce delay-200"
            />
          </>
        )}
        <FileZone
          onLoadFile={onLoadDocument}
          name="documment"
          accept=".doc,.docx, .pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </div>
      <Button
        onClick={handleSendFile}
        text="Guardar"
        bgColor="light-violet"
        classNameLink="w-20"
        uppercase
        disabled={!document}
      />

      <ul className="flex gap-6 justify-start w-full flex-wrap">
        {Files.length !== 0 ? (
          Files.map((item) => (
            <div key={item.id} className="relative">
              <a
                href={item.url}
                className="flex flex-col w-32 p-4 bg-light-gray rounded-xl opacity-80 hover:opacity-100 hover:scale-105 duration-300"
              >
                <TaskRoundedIcon className="w-16 h-16 text-green-600 self-center" />
                <Paragraph
                  // eslint-disable-next-line no-irregular-whitespace
                  children={`${handleNameFile(item.url)}  `}
                  className="text-sm line-clamp-1"
                />
              </a>
              <IconButton
                onClick={() => handleOnDelete(item.id)}
                className="absolute top-1 right-1 z-10"
              >
                <CloseRoundedIcon className="w-5 h-5" />
              </IconButton>
            </div>
          ))
        ) : (
          <EmptyList message="Actualmente no tiene ningún archivo" />
        )}
      </ul>
    </div>
  );
};
