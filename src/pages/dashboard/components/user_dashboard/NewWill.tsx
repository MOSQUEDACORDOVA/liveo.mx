import { AudioRecord, Button, Tabs, VideoRecord } from "@/components";
import { TextArea, TextField } from "@/components/material_ui";
import { PathNames, TOKEN } from "@/config";
import { selectLoginInfo } from "@/features/LoginRegisterUser";
import { setNewPosthumousWill } from "@/features/PosthumousWills";
import { AppDispatch } from "@/features/store";
import { useScrollToTop } from "@/hook";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

export const NewWill = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login_info = useSelector(selectLoginInfo);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [saveData, setSaveData] = useState<IDataSaved>(initialDataValues);
  const TabsData = [
    { name: TabsName.letter, disabled: false },
    { name: TabsName.sound, disabled: false },
    { name: TabsName.vidio, disabled: false },
  ];
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => handleScrollToTop(), []);

  const handleActiveTab = (active: number) => {
    setActiveTab(active);
  };

  const handleSubmit = () => {
    if (
      saveData[INPUTNAMES.ADDRESSEE] !== "" &&
      (saveData.archivo || saveData.texto)
    ) {
      dispatch(
        setNewPosthumousWill({
          ...saveData,
          token: login_info?.token ? login_info.token : TOKEN,
        })
      )
        .unwrap()
        .then(() => navigate(PathNames.private.posthumous_wills));
    } else toast.error("Todos los campos son necesarios");
  };

  const handleRecordFile = (recordFile: File) =>
    setSaveData((prev) => ({ ...prev, archivo: recordFile }));

  const handleInputValues = (name: string, value: string) =>
    setSaveData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    setSaveData((prev) => ({
      ...prev,
      archivo: undefined,
      texto: undefined,
    }));
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-6 mb-60">
      <div className="grid md:grid-cols-2 gap-6 place-items-end">
        <TextField
          label={INPUTLABELS.ADDRESSEE}
          name={INPUTNAMES.ADDRESSEE}
          onInputUpdated={handleInputValues}
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
      <Tabs tabs={TabsData} divider handleActiveTab={handleActiveTab} />
      {activeTab === 0 && (
        <TextArea
          placeholder="Escriba su carta."
          name="texto"
          minRows={6}
          onInputUpdated={handleInputValues}
        />
      )}
      {activeTab === 1 && <AudioRecord audioFile={handleRecordFile} />}
      {activeTab === 2 && <VideoRecord videoFile={handleRecordFile} />}
    </div>
  );
};
