/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginRegister, TopPage } from "@/layout";
import { Alert, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";
import { Button, Terms } from "@/components";
import { PathNames } from "@/config";
import { useRegister } from "@/hook";
import { useRef } from "react";
import dayjs from "dayjs";
import { DateField } from "@/components/material_ui";

export const RegisterPage = () => {
  const {
    dataUser,
    error,
    registerSuccess,
    isLogged,
    disabledButton,
    handleChangeData,
    handleCheked,
    handleClickShowConfirmPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    loading,
    message,
    showConfirmPassword,
    showPassword,
    handleChangeInputs,
  } = useRegister();

  const refAlert = useRef<HTMLSpanElement>(null);

  return (
    <TopPage className="LoginRegisterMUI">
      {!isLogged && (
        <LoginRegister
          title="Regístrate gratis"
          subtitle="Plataforma en la nube que protege tu futuro"
        >
          <div className="flex flex-col w-full sm:w-[80%] gap-4">
            {/* NAME AND SURNAME */}
            <div className="flex gap-4">
              <TextField
                name="name"
                required
                className="w-full bg-white rounded-3xl"
                label="Nombre"
                variant="outlined"
                size="small"
                onChange={handleChangeData}
                value={dataUser.name}
              />
              <TextField
                name="surname"
                required
                className="w-full bg-white rounded-3xl"
                label="Apellidos"
                variant="outlined"
                size="small"
                onChange={handleChangeData}
                value={dataUser.surname}
              />
            </div>
            {/* END */}
            {/* AGE AND MOBILE */}
            <div className="flex gap-4">
              <DateField
                onInputUpdated={handleChangeInputs}
                value={dataUser.age ? dataUser.age : null}
                size="small"
                label="Edad"
                name="age"
                maxDate={dayjs()}
                format="DD-MM-YYYY"
              />
              <TextField
                name="mobile"
                required
                className="w-full bg-white rounded-3xl"
                label="Celular"
                variant="outlined"
                size="small"
                onChange={handleChangeData}
                value={dataUser.mobile}
              />
            </div>
            {/* END */}
            {/* EMAIL */}
            <TextField
              required
              name="email"
              className="w-full bg-white rounded-3xl"
              label="Correo Electrónico"
              variant="outlined"
              size="small"
              onChange={handleChangeData}
              value={dataUser.email}
            />
            {/* END */}
            {/* PASSWORD */}
            <FormControl
              required
              size="small"
              className="w-full"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                name="password"
                required
                onChange={handleChangeData}
                value={dataUser.password}
                className="bg-white"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff className="text-light-violet" />
                      ) : (
                        <Visibility className="text-light-violet" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
            {/* END */}
            {/* CONFIRM PASSWORD */}
            <FormControl
              required
              size="small"
              className="w-full"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                required
                name="confirmPassword"
                onChange={handleChangeData}
                value={dataUser.confirmPassword}
                className="bg-white"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff className="text-light-violet" />
                      ) : (
                        <Visibility className="text-light-violet" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar contraseña"
              />
            </FormControl>
            {/* END  */}
            {/* CHECKBOX + LABEL */}
            <Terms onChange={handleCheked} />
            {/* END */}
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-[80%]">
            <span
              ref={refAlert}
              style={{
                height: message ? 70 : 0,
              }}
              className={`duration-200 overflow-hidden`}
            >
              <Alert
                severity={
                  registerSuccess ? "success" : error ? "error" : "warning"
                }
              >
                {message}
              </Alert>
            </span>

            <Button
              onClick={handleSubmit}
              loading={loading}
              border={loading}
              borderColor="light-violet"
              disabled={disabledButton}
              full
              text="Regístrate"
              bgColor="violet"
            />
            <small className="text-violet font-semibold text-sm text-center z-10">
              ¿Ya eres miembro?{" "}
              <Link className="text-light-violet" to={PathNames.login}>
                Inicia tu sesión
              </Link>
            </small>
          </div>
        </LoginRegister>
      )}
    </TopPage>
  );
};
