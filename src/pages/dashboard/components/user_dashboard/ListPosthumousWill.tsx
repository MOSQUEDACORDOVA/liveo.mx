import VideoFileRoundedIcon from "@mui/icons-material/VideoFileRounded";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import { Paragraph, Suspense } from "@/layout";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  IListPosthumousWill,
  deletePosthumousWill,
  getPosthumousWills,
  selectListPosthumousWills,
  selectPosthumousWillStates,
} from "@/features/PosthumousWills";
import { AppDispatch } from "@/features/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PathNames, TOKEN } from "@/config";
import { EmptyList } from "@/components";
import { selectLoginInfo } from "@/features/LoginRegisterUser";

const headerTable = ["Folio", "Fecha", "Para quien", "Tipo", "Acciones"];

type IFileType = { type: ITypeFile; icon: JSX.Element };

const FILE_TYPE = {
  VIDIO: "Video",
  AUDIO: "Audio",
  LETTER: "Carta",
} as const;

type ITypeFile = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

export const ListPosthumousWill = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wills_state = useSelector(selectPosthumousWillStates);
  const login_info = useSelector(selectLoginInfo);
  const navigate = useNavigate();

  const list_pos_wills = useSelector(selectListPosthumousWills);

  useEffect(() => {
    dispatch(getPosthumousWills(login_info?.token ? login_info.token : TOKEN));
  }, []);

  const handleTypeFile = (item: IListPosthumousWill) => {
    if (item.texto) {
      const file: IFileType = {
        icon: <DescriptionRoundedIcon className="text-blue-600" />,
        type: FILE_TYPE.LETTER,
      };
      return file;
    }
    if (item.archivo) {
      if (item.archivo.includes(".mp4")) {
        const file: IFileType = {
          icon: <VideoFileRoundedIcon className="text-violet" />,
          type: FILE_TYPE.VIDIO,
        };
        return file;
      }
      if (item.archivo.includes(".mp3")) {
        const file: IFileType = {
          icon: <AudioFileRoundedIcon className="text-light-violet" />,
          type: FILE_TYPE.AUDIO,
        };
        return file;
      }
    }
  };

  const handleDeleteWill = (id: string) =>
    dispatch(
      deletePosthumousWill({
        id,
        token: login_info?.token ? login_info.token : TOKEN,
      })
    );

  return (
    <div className="mb-40">
      <table className="rounded-xl overflow-hidden flex lg:flex-col cursor-default">
        <thead className="text-lg bg-violet text-white h-fit p-2 rounded-xl">
          <tr className="grid lg:grid-cols-5 place-content-center">
            {headerTable.map((item, index) => (
              <th
                key={index}
                className={`py-3.5 ${
                  index !== 0 && "lg:border-l border-white"
                } border-b lg:border-none`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {!wills_state.loading && (
          <tbody className="w-full overflow-y-auto max-h-[calc(100dvh-330px)] p-4 lg:p-0">
            {list_pos_wills.length !== 0 &&
              list_pos_wills?.map((item, index) => (
                <tr
                  key={index}
                  className="grid grid-rows-5 lg:grid-rows-none lg:grid-cols-5 place-content-center place-items-center my-4 mx-0.5 p-2 rounded-md shadow-sm shadow-light-violet"
                >
                  <td className="mx-auto border-b lg:border-none">
                    <Paragraph children={item.id} />
                  </td>

                  <td className="mx-auto border-b lg:border-none">
                    <Paragraph
                      children={dayjs(item.created_at).format("DD-MM-YYYY")}
                    />
                  </td>

                  <td className="mx-auto border-b lg:border-none">
                    <Paragraph children={item.destinatario} />
                  </td>

                  <td className="mx-auto inline-flex items-center gap-2 border-b lg:border-none">
                    {handleTypeFile(item)?.icon}
                    <Paragraph children={handleTypeFile(item)?.type} />
                  </td>

                  <td className="mx-auto inline-flex gap-2">
                    <IconButton
                      onClick={() =>
                        navigate(
                          `${PathNames.private.posthumous_wills_edit}/${item.id}`
                        )
                      }
                    >
                      <EditRoundedIcon className="text-blue-700" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteWill(item.id)}>
                      <DeleteForeverRoundedIcon className="text-red-700" />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
      {list_pos_wills.length === 0 && !wills_state.loading && (
        <EmptyList
          className="my-4 mx-1"
          message="Usted actualmente no tienen ninguna voluntad creada."
        />
      )}
      <Suspense loading={wills_state.loading} className="mt-2" />
    </div>
  );
};
