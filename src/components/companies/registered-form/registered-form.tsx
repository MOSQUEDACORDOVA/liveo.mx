import ribbon from "@/assets/waves/onda_slide.png";
import logo from "@/assets/login-register/logo_login.png";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { Button, Title } from "@/components";
import { INPUTLABELS, STATES } from "@/utils";
import { useNavigate } from "react-router-dom";
import { PathNames } from "@/config";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDefaultValues, getResolverValues } from "./registered-form.helpers";
import TextField from "@/components/material_ui/text-field/text-field";
import PasswordField from "@/components/material_ui/password-field/password-field";
import CustomSelect from "@/components/material_ui/custom-select/custom-select";
import {
  useGetCategoriesServices,
  useRegisterCompany,
} from "@/services/company/company.services.hooks";
import PhoneField from "@/components/material_ui/phone-field/phone-field";
import { RegisteredFormValues } from "./registered-form.types";
import { useLoginData } from "@/services/auth/auth.services.hooks";
import { CategoryService } from "@/models/category.model";

const RegisteredForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: registerCompany, isLoading: isLoadingRegister } =
    useRegisterCompany();
  const { data: categoriesServices } = useGetCategoriesServices();
  const { mutateAsync: loginData, isLoading: isLoadingLogin } = useLoginData();
  const form = useForm<RegisteredFormValues>({
    mode: "onChange",
    defaultValues: getDefaultValues(),
    resolver: yupResolver<RegisteredFormValues>(getResolverValues()),
  });

  const { register, handleSubmit, formState } = form;
  const { isValid, errors, defaultValues } = formState;

  const onSubmit = async (values: RegisteredFormValues) => {
    try {
      const data = {
        ...values,
        phoneNumber: `${values.prefix}${values.phoneNumber}`,
      };
      const response = await registerCompany(data);

      if (!response || response?.data) return;

      await loginData({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div
      className="w-full md:w-[550px] bg-white relative p-10 shrink-0"
      style={{ maxHeight: "100vh", overflowY: "scroll", overflowX: "hidden" }}
    >
      <img
        src={ribbon}
        alt="ribbon"
        className="absolute -bottom-14 -right-14 opacity-30"
      />

      <IconButton
        onClick={() => navigate(PathNames.home)}
        className="absolute right-6 top-6"
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>

      <div>
        <img src={logo} alt="logo" className="w-40 relative" />
        <Title
          title="Haz crecer tu negocio con Liveo. Registra tu negocio"
          Tag="h6"
          color="light-violet"
          className="ml-1.5 mt-2"
        />
      </div>
      <FormProvider {...form}>
        <form
          className="relative my-10 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label={INPUTLABELS.NAME_COMPANIE}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />

          <div className="grid grid-cols-2 gap-5">
            <CustomSelect
              label={INPUTLABELS.STATE}
              options={STATES}
              getLabelOption={(option) => option as string}
              getValueOption={(option) => option as string}
              getIdOption={(_, index) => `${index}`}
              defaultValue={defaultValues?.colony || ""}
              {...register("colony")}
            />
            <TextField
              label={INPUTLABELS.CITY}
              error={!!errors.city}
              helperText={errors.city?.message}
              {...register("city")}
            />
            {/* <TextField
              label={INPUTLABELS.TYPE_SECTOR}
              error={!!errors.sectorType}
              helperText={errors.sectorType?.message}
              {...register("sectorType")}
            /> */}
            <CustomSelect
              label={INPUTLABELS.TYPE_SECTOR}
              options={categoriesServices ?? []}
              getLabelOption={(option) => (option as CategoryService).name}
              getValueOption={(option) => (option as CategoryService).name}
              getIdOption={(_, index) => `${index}`}
              defaultValue={""}
              {...register("sectorType")}
            />
            <TextField
              label={INPUTLABELS.ACTIVITY_SECTOR}
              error={!!errors.sector}
              helperText={errors.sector?.message}
              {...register("sector")}
            />
          </div>
          <PhoneField
            label={INPUTLABELS.CELL_PHONE}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            name="phoneNumber"
            namePrefix="prefix"
            defaultValuePrefix={defaultValues?.prefix || ""}
          />

          <div className="flex flex-col gap-5">
            <Title title="Datos de usuario" color="light-violet" Tag="h6" />
            <TextField
              type="email"
              label={INPUTLABELS.EMAIL}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <PasswordField
              label={INPUTLABELS.PASSWORD}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <FormControlLabel
              className="text-sm ml-0 -mt-3"
              sx={{ ".css-ahj2mt-MuiTypography-root": { fontSize: "14px" } }}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: "#422a79",
                    "&.Mui-checked": {
                      color: "#422a79",
                    },
                  }}
                  {...register("privacy")}
                />
              }
              label={`Acepto las condiciones de uso y la política de privacidad liveo`}
            />
          </div>

          <Button
            type="submit"
            borderColor="light-violet"
            disabled={!isValid}
            loading={isLoadingRegister && isLoadingLogin}
            full
            text="Regístrate"
            bgColor="violet"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisteredForm;
