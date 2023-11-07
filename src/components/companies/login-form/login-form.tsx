/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Title } from "@/components";
import { INPUTLABELS } from "@/utils";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues } from "./login-form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLoginFormResolverHelper } from "./login-form.helpers";
import TextField from "@/components/material_ui/text-field/text-field";
import PasswordField from "@/components/material_ui/password-field/password-field";
import { Alert } from "@mui/material";
import { useLoginData } from "@/services/auth/auth.services.hooks";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync: loginData, isLoading } = useLoginData();
  const form = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(getLoginFormResolverHelper()),
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await loginData(values);
      if (response.user) return;

      setErrorMessage(response.msg);
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    } finally {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div
      data-aos="fade-right"
      className="text-center max-w-[500px] p-8 bg-white rounded-2xl"
    >
      <Title title="Acceso Empresas" color="violet" Tag="h5" />
      <form
        className="flex flex-col gap-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
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

        <div
          style={{
            height: errorMessage ? 70 : 0,
            marginTop: !errorMessage ? -20 : 0,
          }}
          className="duration-200 overflow-hidden"
        >
          <Alert severity="warning">{errorMessage}</Alert>
        </div>

        <Button
          type="submit"
          text="Iniciar Sesión"
          bgColor="light-violet"
          disabled={!isValid}
          loading={isLoading}
          full
        />
      </form>
    </div>
  );
};

export default LoginForm;
