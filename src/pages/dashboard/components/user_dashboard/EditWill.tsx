import { AudioRecord, Button, Tabs, VideoRecord } from "@/components";
import { TextArea, TextField } from "@/components/material_ui";
import { PathNames, TOKEN } from "@/config";
import { selectLoginInfo } from "@/features/LoginRegisterUser";
import {
  IListPosthumousWill,
  getPosthumousWillById,
  selectPosthumousWillById,
  selectPosthumousWillStates,
  editPosthumousWill,
  IEditDataSaved,
} from "@/features/PosthumousWills";
import { AppDispatch } from "@/features/store";
import { useScrollToTop } from "@/hook";
import { Suspense } from "@/layout";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TabsName = {
  vidio: "Video",
  sound: "Audio",
  letter: "Carta",
} as const;

export type ITabNameNewWill = (typeof TabsName)[keyof typeof TabsName];

export type IDataSaved = {
  texto?: string;
  [INPUTNAMES.ADDRESSEE]: string;
  archivo?: File;
};

const initialDataValues = { [INPUTNAMES.ADDRESSEE]: "" };

export const EditWill = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posthumous_will = useSelector(selectPosthumousWillById);
  const login_info = useSelector(selectLoginInfo);
  const posthumous_will_states = useSelector(selectPosthumousWillStates);
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<number | undefined>(0);
  const [saveData, setSaveData] = useState<IDataSaved>(initialDataValues);
  const TabsData = [
    {
      name: TabsName.letter,
      disabled: true,
    },
    {
      name: TabsName.sound,
      disabled: true,
    },
    {
      name: TabsName.vidio,
      disabled: true,
    },
  ];
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => handleScrollToTop(), []);

  const handleActiveTab = (active: number) => {
    setActiveTab(active);
  };

  const handleSubmit = () => {
    if (saveData[INPUTNAMES.ADDRESSEE] !== "" && id) {
      const data: IEditDataSaved = {
        ...saveData,
        id,
        token: login_info?.token ? login_info.token : TOKEN,
      };
      dispatch(editPosthumousWill(data))
        .unwrap()
        .then(() => navigate(PathNames.private.posthumous_wills));
    } else toast.error("Todos los campos son necesarios");
  };

  const handleRecordFile = (recordFile: File) =>
    setSaveData((prev) => ({ ...prev, archivo: recordFile }));

  const handleInputValues = (name: string, value: string) =>
    setSaveData((prev) => ({ ...prev, [name]: value }));

  const handleTypeFile = (item: IListPosthumousWill) => {
    if (item.texto) {
      TabsData[0].disabled = false;
      return 0;
    }
    if (item.archivo) {
      if (item.archivo.includes(".mp3")) {
        TabsData[1].disabled = false;
        return 1;
      }
      if (item.archivo.includes(".mp4")) {
        TabsData[2].disabled = false;
        return 2;
      }
    }
  };

  useEffect(() => {
    id &&
      dispatch(
        getPosthumousWillById({
          id,
          token: login_info?.token ? login_info.token : TOKEN,
        })
      )
        .unwrap()
        .then((resp) => setActiveTab(handleTypeFile(resp)));
  }, []);

  return (
    <div className="flex flex-col gap-6 mb-60">
      <div className="grid grid-cols-2 gap-6 place-items-end">
        <TextField
          label={INPUTLABELS.ADDRESSEE}
          name={INPUTNAMES.ADDRESSEE}
          onInputUpdated={handleInputValues}
          value={posthumous_will?.destinatario}
        />
        <div className="flex gap-6 items-center">
          <Button
            text="Guardar"
            bgColor="light-violet"
            classNameLink="min-w-[100px]"
            onClick={handleSubmit}
          />
          <Button
            text="Cancelar"
            bgColor="none"
            textColor="light-violet"
            border
            borderColor="light-violet"
            classNameLink="min-w-[100px] delay-0"
            onClick={() => navigate(PathNames.private.posthumous_wills)}
          />
        </div>
      </div>
      <Tabs
        tabs={TabsData}
        value={activeTab}
        divider
        handleActiveTab={handleActiveTab}
      />
      <Suspense
        loading={posthumous_will_states.loading}
        className="flex flex-col gap-6"
      >
        {activeTab === 0 && (
          <TextArea
            placeholder="Escriba su carta."
            name="texto"
            minRows={6}
            onInputUpdated={handleInputValues}
            value={posthumous_will?.texto}
          />
        )}
        {activeTab === 1 && (
          <AudioRecord
            audio_url={posthumous_will?.archivo}
            audioFile={handleRecordFile}
          />
        )}
        {activeTab === 2 && (
          <VideoRecord
            video_url={posthumous_will?.archivo}
            videoFile={handleRecordFile}
          />
        )}
      </Suspense>
    </div>
  );
};
