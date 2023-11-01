/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import defaultAvatar from "@/assets/avatars/defaultAvatar.jpg";
import { Button, FileZone } from "@/components";
import {

  PasswordField,
  TextField, 
  TextArea,
} from "../../../../components/material_ui";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import {
  EditProfile,
  selectDashboardProfile,
} from "@/features/LoginRegisterUser";
import { AppDispatch } from "@/features/store";
import { IPROFILEDATA } from "@/types";
import { Divider } from "@mui/material";
import dayjs from "dayjs";

export const CompaniesAccountTab = () => {
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
    <div className="flex flex-col gap-8 xl:pb-40" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
      <h5 className="font-semibold text-center lg:text-left">
        Mi empresa información
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
          <div className="grid md:grid-cols-1 gap-4">
            <InputLabel htmlFor={INPUTNAMES.COMPANIE_NAME}>
              {INPUTLABELS.COMPANIE_NAME}
            </InputLabel>
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label=''
              name={INPUTNAMES.NAME}
              value={formData.name}
            />
            <InputLabel htmlFor={INPUTNAMES.COMPANIE_SLOGAN}>
              {INPUTLABELS.COMPANIE_SLOGAN}
            </InputLabel>
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label=''
              name={INPUTNAMES.SURNAME}
              value={formData.apellido}
            />
            <InputLabel htmlFor={INPUTNAMES.COMPANIE_DESCRIPTION}>
              {INPUTLABELS.COMPANIE_DESCRIPTION}
            </InputLabel>
            <TextArea
              onInputUpdated={handleChangeInputs}
              name={INPUTNAMES.COMPANIE_DESCRIPTION}
              minRows={4}
              value={INPUTNAMES.COMPANIE_DESCRIPTION}
              placeholder={INPUTNAMES.COMPANIE_DESCRIPTION}

            />

          </div>

          <Divider />
          <h5 className="mb-4">Contacto</h5>
          <div className="grid md:grid-cols-2 gap-4">
            
            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              type="email"
              label={INPUTLABELS.EMAIL}
              name={INPUTNAMES.EMAIL}
              value={formData.email}
            />

            <TextField
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.WEBSITE}
              name={INPUTNAMES.WEBSITE}
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
          <h5 className="mb-4">Dirección</h5>
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
          <br></br>
          {/* THIRD BLOCK  */}
          <div className="grid md:grid-cols-1 gap-4">
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
