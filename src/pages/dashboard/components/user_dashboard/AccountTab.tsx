/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import defaultAvatar from "@/assets/avatars/defaultAvatar.jpg";
import { Button, FileZone } from "@/components";
import {
  DateField,
  PasswordField,
  TextField,
} from "../../../../components/material_ui";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  EditProfile,
  selectDashboardProfile,
} from "@/features/LoginRegisterUser";
import { AppDispatch } from "@/features/store";
import { IPROFILEDATA } from "@/types";
import { Divider } from "@mui/material";
import dayjs from "dayjs";

export const AccountTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectDashboardProfile);
  const [_avatarFile, setAvatarFile] = useState<File>();
  const [formData, setFormData] = useState<IPROFILEDATA>({
    name: userInfo?.name,
    apellido: userInfo?.apellido,
    celular: userInfo?.celular,
    dir_ciudad: userInfo?.dir_ciudad,
    dir_colonia: userInfo?.dir_colonia,
    dir_pais: userInfo?.dir_pais,
    email: userInfo?.email,
    password: "",
    telefono: userInfo?.telefono,
    dir_calle: userInfo?.dir_calle,
    dir_postal: userInfo?.dir_postal,
    nacimiento: userInfo?.nacimiento,
    avatar: userInfo?.avatar ?? defaultAvatar,
  });

  const onLoadImage = (file: File) => {
    const url_file = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatar: url_file }));
    setAvatarFile(file);
  };

  const handleChangeInputs = (name: string, value: any) => {
    name && setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    let buildObjectToSend = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value !== null && value !== "") {
        if (key === "nacimiento" && dayjs(value).isValid()) {
          buildObjectToSend = {
            ...buildObjectToSend,
            [key]: dayjs(value.toString()).format("YYYY-MM-DD"),
          };
        } else if (value !== null && value !== "" && key === "avatar") {
          buildObjectToSend = { ...buildObjectToSend, avatar: _avatarFile };
        } else buildObjectToSend = { ...buildObjectToSend, [key]: value };
      }
    }
    dispatch(EditProfile(buildObjectToSend));
  };

  return (
    <div className="flex flex-col gap-8 xl:pb-40">
      <h5 className="font-semibold text-center lg:text-left">
        Mi cuenta información
      </h5>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* AVATAR */}
        <div className="relative shrink-0 w-36 h-36 mx-auto">
          <FileZone onLoadFile={onLoadImage} name="profileAvatar" />
          <img
            src={formData.avatar}
            alt="avatar"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="grid gap-4 w-full">
          {/* FIRST BLOCK */}
          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.NAME}
              name={INPUTNAMES.NAME}
              value={formData.name}
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.SURNAME}
              name={INPUTNAMES.SURNAME}
              value={formData.apellido}
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              type="email"
              label={INPUTLABELS.EMAIL}
              name={INPUTNAMES.EMAIL}
              value={formData.email}
            />

            <DateField
              onInputUpdated={handleChangeInputs}
              value={formData.nacimiento ? formData.nacimiento : null}
              size="small"
              label={INPUTLABELS.BIRTH_DATE}
              name={INPUTNAMES.BIRTH_DATE}
              maxDate={dayjs()}
              format="DD-MM-YYYY"
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.CELL_PHONE}
              name={INPUTNAMES.CELL_PHONE}
              value={formData.celular}
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.PHONE}
              name={INPUTNAMES.PHONE}
              value={formData.telefono}
            />
          </div>

          <Divider />

          {/* SECOND BLOCK */}
          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.STREET}
              name={INPUTNAMES.STREET}
              value={formData.dir_calle}
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.COLONY}
              name={INPUTNAMES.COLONY}
              value={formData.dir_colonia}
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.CITY}
              name={INPUTNAMES.CITY}
              value={formData.dir_ciudad}
            />

            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.ZIP_CODE}
              name={INPUTNAMES.ZIP_CODE}
              value={formData.dir_postal}
            />
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.COUNTRY}
              name={INPUTNAMES.COUNTRY}
              value={formData.dir_pais}
            />
          </div>

          <Divider />

          {/* THIRD BLOCK  */}
          <div className="grid md:grid-cols-2 gap-4">
            <PasswordField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.PASSWORD}
              name={INPUTNAMES.PASSWORD}
              value={formData.password}
            />
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="mb-5 flex justify-end gap-6 z-50">
        <Button
          text="Guardar"
          bgColor="light-violet"
          classNameLink="w-40"
          onClick={handleSubmit}
        />
        <Button
          text="Cancelar"
          bgColor="none"
          textColor="light-violet"
          border
          borderColor="light-violet"
          classNameLink="w-40"
        />
      </div>
    </div>
  );
};
