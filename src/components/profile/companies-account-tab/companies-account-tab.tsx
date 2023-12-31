/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import { Button, FileZone } from "@/components";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import { IUser, selectDashboardProfile } from "@/features/LoginRegisterUser";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@/components/material_ui/text-field/text-field";
import defaultAvatar from "@/assets/avatars/defaultAvatar.jpg";
import {
  getCompanyAccountDefaultValuesHelper,
  getCompanyAccountResolverHelper,
} from "./companies-account-tab.helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import CompaniesAccountValues from "./companies-account.types";
import TextArea from "@/components/material_ui/text-area/text-area";
import { useEditCompanyProfile } from "@/services/auth/auth.services.hooks";

const CompaniesAccountTab = () => {
  const userInfo = useSelector(selectDashboardProfile);
  const { avatar: userAvatar = "" } = userInfo ?? {};
  const [avatar, setAvatar] = useState<File | string>(userAvatar);

  const { mutateAsync: editCompanyProfile } = useEditCompanyProfile();
  const form = useForm<CompaniesAccountValues>({
    mode: "onChange",
    defaultValues: getCompanyAccountDefaultValuesHelper(userInfo),
    resolver: yupResolver<CompaniesAccountValues>(
      getCompanyAccountResolverHelper()
    ),
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  const urlAvatar = useMemo(() => {
    if (!avatar) return defaultAvatar;
    if (typeof avatar === "string") return avatar;
    return URL.createObjectURL(avatar);
  }, [avatar]);

  const onLoadImage = useCallback((file: File) => setAvatar(file), []);

  const onSubmit = async (values: CompaniesAccountValues) => {
    await editCompanyProfile({ ...userInfo, ...values, avatar } as IUser);
  };

  return (
    <div className="flex flex-col gap-8">
      <h5 className="font-semibold text-center lg:text-left">
        Mi empresa información
      </h5>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* AVATAR */}
        <div className="relative shrink-0 w-36 h-36 mx-auto">
          <FileZone onLoadFile={onLoadImage} name="profileAvatar" />
          <img
            src={urlAvatar}
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
                {...register("descripcion")}
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
                error={!!errors.web_site}
                helperText={errors.web_site?.message}
                {...register("web_site")}
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
