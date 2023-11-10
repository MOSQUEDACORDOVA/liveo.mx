import TextField from "@/components/material_ui/text-field/text-field";
import { InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { CompaniesSocialMediaValues } from "./companies-socal-media.types";
import { Button } from "@/components";
import { useEditCompanyProfile } from "@/services/auth/auth.services.hooks";
import { useSelector } from "react-redux";
import { IUser, selectDashboardProfile } from "@/features/LoginRegisterUser";
import {
  getCompaniesSocialMediaDefaultValues,
  getCompaniesSocialMediaResolvers,
} from "./companies-social-media-tab.helpers";
import { yupResolver } from "@hookform/resolvers/yup";

const CompaniesSocialMediaTab = () => {
  const user = useSelector(selectDashboardProfile);
  const { mutateAsync: editCompanyProfile } = useEditCompanyProfile();
  const form = useForm<CompaniesSocialMediaValues>({
    mode: "onChange",
    defaultValues: getCompaniesSocialMediaDefaultValues(user),
    resolver: yupResolver(getCompaniesSocialMediaResolvers()),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (values: CompaniesSocialMediaValues) => {
    await editCompanyProfile({ ...(user as IUser), ...values });
  };

  return (
    <div className="flex flex-col gap-8">
      <h5 className="font-semibold lg:text-left mb-2">Redes sociales</h5>
      <form
        id="socialMediaForm"
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-1 gap-4"
      >
        <InputLabel>Link Facebook</InputLabel>
        <TextField
          label=""
          placeholder="https://www.facebook.com/floreriasamillionflowers"
          error={!!errors.url_facebook}
          helperText={errors.url_facebook?.message}
          {...register("url_facebook")}
        />
        <InputLabel>Link Instagram</InputLabel>
        <TextField
          label=""
          placeholder="https://www.instagram.com/floreria.amillion.flowers/?igshid=YmMyMTA2M2Y"
          error={!!errors.url_instagram}
          helperText={errors.url_instagram?.message}
          {...register("url_instagram")}
        />
        <InputLabel>Link Tiktok</InputLabel>
        <TextField
          label=""
          placeholder="https://www.tiktok.com/@floreria.amillionflowers?_t=8Z1ss5as"
          error={!!errors.url_tikTok}
          helperText={errors.url_tikTok?.message}
          {...register("url_tikTok")}
        />
      </form>
      <div className="mb-5 flex justify-end gap-6 z-50">
        <Button
          type="submit"
          text="Guardar"
          bgColor="light-violet"
          classNameLink="w-40"
          form="socialMediaForm"
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

export default CompaniesSocialMediaTab;
