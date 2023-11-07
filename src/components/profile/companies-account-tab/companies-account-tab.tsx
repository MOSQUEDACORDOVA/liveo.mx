/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { Button, FileZone } from "@/components";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import { selectDashboardProfile } from "@/features/LoginRegisterUser";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@/components/material_ui/text-field/text-field";
import {
  getCompanyAccountDefaultValuesHelper,
  getCompanyAccountResolverHelper,
} from "./companies-account-tab.helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import CompaniesAccountValues from "./companies-account.types";
import PasswordField from "@/components/material_ui/password-field/password-field";
import TextArea from "@/components/material_ui/text-area/text-area";
import { useEditProfile } from "@/services/auth/auth.services.hooks";

const CompaniesAccountTab = () => {
  const userInfo = useSelector(selectDashboardProfile);

  const [_avatarFile, setAvatarFile] = useState<File>();

  const { mutateAsync: editProfile } = useEditProfile();
  const form = useForm<CompaniesAccountValues>({
    mode: "onChange",
    defaultValues: getCompanyAccountDefaultValuesHelper(userInfo),
    resolver: yupResolver<CompaniesAccountValues>(
      getCompanyAccountResolverHelper()
    ),
  });

  const { register, formState, handleSubmit, setValue } = form;
  const { getValues } = form;
  const { errors } = formState;
  const { avatar } = getValues();

  const onLoadImage = useCallback((file: File) => {
    const urlFile = URL.createObjectURL(file);
    setValue("avatar", urlFile);
    setAvatarFile(file);
  }, []);

  const onSubmit = async (values: CompaniesAccountValues) => {
    await editProfile(values);
  };

  return (
    <div
      className="flex flex-col gap-8 xl:pb-40"
      style={{ maxHeight: "100vh", overflowY: "scroll" }}
    >
      <h5 className="font-semibold text-center lg:text-left">
        Mi empresa información
      </h5>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* AVATAR */}
        <div className="relative shrink-0 w-36 h-36 mx-auto">
          <FileZone onLoadFile={onLoadImage} name="profileAvatar" />
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="grid gap-4 w-full">
          {/* FIRST BLOCK */}
          <form id="companyAccountForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-1 gap-4">
              <InputLabel htmlFor={INPUTNAMES.COMPANIE_NAME}>
                {INPUTLABELS.COMPANIE_NAME}
              </InputLabel>
              <TextField
                size="small"
                label=""
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name")}
              />
              <InputLabel htmlFor={INPUTNAMES.COMPANIE_SLOGAN}>
                {INPUTLABELS.COMPANIE_SLOGAN}
              </InputLabel>
              <TextField
                size="small"
                label=""
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
                {...register("apellido")}
              />
              <InputLabel htmlFor={INPUTNAMES.COMPANIE_DESCRIPTION}>
                {INPUTLABELS.COMPANIE_DESCRIPTION}
              </InputLabel>
              <TextArea
                minRows={4}
                placeholder={INPUTNAMES.COMPANIE_DESCRIPTION}
                {...register("description")}
              />
            </div>

            <Divider />
            <h5 className="mb-4">Contacto</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <TextField
                size="small"
                type="email"
                label={INPUTLABELS.EMAIL}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <TextField
                size="small"
                label={INPUTLABELS.WEBSITE}
                error={!!errors.website}
                helperText={errors.website?.message}
                {...register("website")}
              />

              <TextField
                size="small"
                label={INPUTLABELS.CELL_PHONE}
                error={!!errors.celular}
                helperText={errors.celular?.message}
                {...register("celular")}
              />

              <TextField
                size="small"
                label={INPUTLABELS.PHONE}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
                {...register("telefono")}
              />
            </div>

            <Divider />
            <h5 className="mb-4">Dirección</h5>
            {/* SECOND BLOCK */}
            <div className="grid md:grid-cols-2 gap-4">
              <TextField
                size="small"
                label={INPUTLABELS.STREET}
                error={!!errors.dir_calle}
                helperText={errors.dir_calle?.message}
                {...register("dir_calle")}
              />
              <TextField
                size="small"
                label={INPUTLABELS.COLONY}
                error={!!errors.dir_colonia}
                helperText={errors.dir_colonia?.message}
                {...register("dir_colonia")}
              />
              <TextField
                size="small"
                label={INPUTLABELS.CITY}
                error={!!errors.dir_ciudad}
                helperText={errors.dir_ciudad?.message}
                {...register("dir_ciudad")}
              />

              <TextField
                size="small"
                label={INPUTLABELS.ZIP_CODE}
                error={!!errors.dir_postal}
                helperText={errors.dir_postal?.message}
                {...register("dir_postal")}
              />
              <TextField
                size="small"
                label={INPUTLABELS.COUNTRY}
                error={!!errors.dir_pais}
                helperText={errors.dir_pais?.message}
                {...register("dir_pais")}
              />
            </div>

            {/* TODO: Remove if confirmed */}
            {/* <Divider />
            <br></br>
            <div className="grid md:grid-cols-1 gap-4">
              <PasswordField
                size="small"
                label={INPUTLABELS.PASSWORD}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
            </div> */}
          </form>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="mb-5 flex justify-end gap-6 z-50">
        <Button
          type="submit"
          text="Guardar"
          bgColor="light-violet"
          classNameLink="w-40"
          form="companyAccountForm"
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

export default CompaniesAccountTab;
