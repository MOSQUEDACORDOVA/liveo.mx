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
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { PathNames, validateInput } from "@/config";
import {
  LoginData,
  selectIsLogged,
  selectLoginInfo,
  selectLoginLoading,
} from "@/features/LoginRegisterUser";
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from "@/hook";

export const LoginPage = () => {
  const dispatch = useDispatch<any>();
  const loading = useSelector(selectLoginLoading);
  const infoLogin = useSelector(selectLoginInfo);
  const islogged = useSelector(selectIsLogged);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => {
    islogged && navigate(PathNames.home);
    handleScrollToTop();
  }, []);

  const timeoutMessage = () => setTimeout(() => setMessage(""), 3000);

  useEffect(() => {
    if (!firstLoad) {
      if (message === "" && infoLogin) {
        setMessage(infoLogin.msg);
        timeoutMessage();
        clearTimeout(timeoutMessage());
      }
      if (islogged && infoLogin) {
        navigate(PathNames.private.profile);
        setMessage(infoLogin.msg);
        timeoutMessage();
        clearTimeout(timeoutMessage());
      }
    } else setFirstLoad(false);
  }, [infoLogin, islogged]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const toValidate = validateInput.email.test(dataUser.email);
    if (!toValidate) {
      setMessage("El correo electrónico no es válido");
      timeoutMessage();
      clearTimeout(timeoutMessage());
    }
    toValidate && dataUser.password && dispatch(LoginData(dataUser));
  };
  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const refAlert = useRef<HTMLSpanElement>(null);

  return (
    <TopPage className="LoginRegisterMUI pb-60">
      {!islogged && (
        <LoginRegister
          title="Iniciar Sesión"
          subtitle="Plataforma en la nube que protege tu futuro"
        >
          <form className="flex flex-col w-full sm:w-[80%] gap-4">
            {/* EMAIL */}
            <TextField
              required
              name="email"
              className="w-full bg-white rounded-3xl"
              id="outlined-basic"
              label="Correo Electrónico"
              variant="outlined"
              size="small"
              onChange={handleChangeData}
              value={dataUser.email}
            />
            {/* END */}
            {/* PASSWORD */}
            <FormControl size="small" className="w-full" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={handleChangeData}
                value={dataUser.password}
                className="bg-white"
                id="outlined-adornment-password"
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
            <Link
              className="text-black/30 text-sm -mt-2 self-end m-2 hover:text-light-violet"
              to=""
            >
              Olvidaste tu contraseña
            </Link>
          </form>
          <div className="flex flex-col gap-3 w-full sm:w-[80%]">
            <span
              ref={refAlert}
              style={{
                height: message ? 70 : 0,
              }}
              className={`duration-200 overflow-hidden`}
            >
              <Alert severity={"warning"}>{message}</Alert>
            </span>
            <Button
              onClick={() => handleSubmit()}
              loading={loading}
              border={loading}
              borderColor="light-violet"
              full
              type="submit"
              text="Iniciar sesión"
              bgColor="violet"
            />
            <small className="text-violet font-semibold text-sm text-center z-20">
              Registrarse click{" "}
              <Link className="text-light-violet" to={PathNames.register}>
                aquí
              </Link>
            </small>
          </div>
        </LoginRegister>
      )}
    </TopPage>
  );
};
