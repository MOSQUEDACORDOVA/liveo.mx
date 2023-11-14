import { Button } from "@/components";
import TextArea from "@/components/material_ui/text-area/text-area";
import { IUser, selectDashboardProfile } from "@/features/LoginRegisterUser";
import { useEditCompanyProfile } from "@/services/auth/auth.services.hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  getCompaniesLocationsDefaultValues,
  getCompaniesLocationsResolver,
} from "./companies-locations-tab.helpers";
import "./companies-locations-tab.style.css";
import { CompaniesLocationsValues } from "./companies-locations-tab.types";

const CompaniesLocationsTab = () => {
  const user = useSelector(selectDashboardProfile);
  const { mutateAsync: editCompanyProfile } = useEditCompanyProfile();
  const form = useForm<CompaniesLocationsValues>({
    mode: "onChange",
    defaultValues: getCompaniesLocationsDefaultValues(user),
    resolver: yupResolver(getCompaniesLocationsResolver()),
  });

  const { handleSubmit, register, watch, formState } = form;
  const { errors } = formState;

  const { iframeGoogle } = watch();

  const onSubmit = async (values: CompaniesLocationsValues) => {
    const data = {
      ...user,
      iframe_google: values.iframeGoogle,
    };

    await editCompanyProfile(data as IUser);
  };

  return (
    <div
      className="companies-locations flex flex-col gap-8"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <h5 className="font-semibold lg:text-left mb-2">Ubicaciones</h5>
      <form id="companyLocationsForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-1 gap-4 overflow-y-auto">
          <InputLabel>Ingrese su ubicación</InputLabel>
          <TextArea {...register("iframeGoogle")} />
          {!!errors.iframeGoogle && (
            <p className="text-xs text-red-500">
              {errors.iframeGoogle?.message}
            </p>
          )}
        </div>
        <div
          className="companies-locations__map-container w-full mt-10 flex justify-center"
          dangerouslySetInnerHTML={{ __html: iframeGoogle ?? "" }}
        ></div>
      </form>
      <div className="mb-5 mt-10 flex justify-end gap-6 z-50">
        <Button
          type="submit"
          text="Guardar dirección"
          bgColor="light-violet"
          form="companyLocationsForm"
        />
      </div>
    </div>
  );
};

export default CompaniesLocationsTab;
