/* eslint-disable react-hooks/exhaustive-deps */
import { PathNames, validateInput } from "@/config";
import {
  LoginData,
  RegisterData,
  removeRegistermsg,
  selectIsLogged,
  selectRegisterError,
  selectRegisterInfo,
  selectRegisterLoading,
  setError,
} from "@/features/LoginRegisterUser";
import { AppDispatch } from "@/features/store";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialUserState = {
  name: "",
  surname: "",
  age: null,
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector(selectRegisterLoading);
  const registerInfo = useSelector(selectRegisterInfo);
  const error = useSelector(selectRegisterError);
  const isLogged = useSelector(selectIsLogged);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState(initialUserState);

  const registerSuccess = registerInfo && registerInfo.msg !== null;

  useEffect(() => {
    isLogged && navigate(PathNames.home);
  }, [isLogged]);

  const timeoutMessage = (time?: number) =>
    setTimeout(() => {
      setMessage("");
      if (error) dispatch(setError(false));
      if (registerSuccess) {
        dispatch(removeRegistermsg());
      }
    }, time ?? 5000);

  useEffect(() => {
    if (error) {
      setMessage("Ya se encuentra un registro email igual");
      timeoutMessage();
      clearTimeout(timeoutMessage());
    }

    if (registerSuccess) {
      const autoLogUser: { email: string; password: string } = {
        email: dataUser.email,
        password: dataUser.password,
      };
      setMessage(registerInfo.msg);
      dispatch(LoginData(autoLogUser)).then((resp) => {
        if (resp.payload.token) {
          navigate(PathNames.private.profile);
        }
      });
    }
  }, [registerInfo, error]);

  useEffect(() => {
    const {
      allOk,
      isEmpty,
      badAge,
      badEmail,
      badMobile,
      diferenceInPassword,
      passwordLength,
    } = handleItsAllInputsOk();

    if (badAge) {
      return setMessage("La edad no es válida");
    } else if (badEmail) {
      return setMessage("El correo electrónico no es válido");
    } else if (badMobile) {
      return setMessage("El celular no es válido");
    } else if (diferenceInPassword) {
      return setMessage("Las contraseñas no coinciden");
    } else if (!passwordLength) {
      return setMessage("La contraseña debe tener minimo 6 caracteres");
    } else if (isEmpty) {
      return setMessage("Faltan campos por llenar");
    }
    if (allOk) {
      timeoutMessage(300);
      clearTimeout(timeoutMessage());
    }
  }, [dataUser]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleCheked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setDisabledButton(!checked);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleItsAllInputsOk = () => {
    const isEmpty =
      dataUser.email === "" ||
      dataUser.password === "" ||
      dataUser.confirmPassword === "" ||
      dataUser.name === "" ||
      dataUser.surname === "";

    const passwordLength = dataUser.password.length >= 6;
    const diferentPassword = dataUser.password !== dataUser.confirmPassword;

    const toValidateEmail = validateInput.email.test(dataUser.email);
    const toValidateMobile = validateInput.phone.test(dataUser.mobile);
    const toValidateAge = dayjs(dataUser.age).isValid();

    const badEmail = !isEmpty && !toValidateEmail;
    const badMobile = !isEmpty && !toValidateMobile;
    const badAge = !isEmpty && !toValidateAge;
    const diferenceInPassword = !isEmpty && diferentPassword;

    const allOk =
      !isEmpty &&
      toValidateEmail &&
      toValidateMobile &&
      toValidateAge &&
      passwordLength &&
      !diferentPassword;

    return {
      isEmpty,
      allOk,
      badEmail,
      badMobile,
      badAge,
      diferenceInPassword,
      passwordLength,
    };
  };

  const handleSubmit = () => {
    const { allOk } = handleItsAllInputsOk();

    allOk && dispatch(RegisterData(dataUser));
  };

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const handleChangeInputs = (name: string, value: any) => {
    name && setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  return {
    registerSuccess,
    error,
    dataUser,
    isLogged,
    loading,
    disabledButton,
    showConfirmPassword,
    showPassword,
    message,
    handleChangeData,
    handleSubmit,
    handleMouseDownPassword,
    handleCheked,
    handleClickShowConfirmPassword,
    handleClickShowPassword,
    handleChangeInputs,
  };
};
