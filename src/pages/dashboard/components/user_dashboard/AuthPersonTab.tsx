import { Button, EmptyList, Title } from "@/components";
import { TextField } from "@/components/material_ui";
import { TOKEN } from "@/config";
import {
  IAuthPerson,
  deleteAuthPerson,
  getAuthPerson,
  selectAutPersonInfo,
  selectAutPersonIsLoading,
  selectLoginInfo,
  setAuthPerson,
} from "@/features/LoginRegisterUser";
import { AppDispatch } from "@/features/store";
import { Suspense } from "@/layout";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { toast } from "react-toastify";

const initialFormData = {
  [INPUTNAMES.NAME]: "",
  [INPUTNAMES.SURNAME]: "",
  [INPUTNAMES.CELL_PHONE]: "",
  [INPUTNAMES.EMAIL]: "",
};

export const AuthPersonTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login_info = useSelector(selectLoginInfo);
  const aut_person = useSelector(selectAutPersonInfo);
  const isLoading = useSelector(selectAutPersonIsLoading);
  const [formData, setFormData] = useState(initialFormData);
  const [resetValue, setResetValue] = useState(false);

  const handleResetValues = () => {
    setResetValue(true);
    const timeOutResetValue = () => setTimeout(() => setResetValue(false), 500);
    timeOutResetValue();
    clearTimeout(timeOutResetValue());
  };

  const handleChangeInputs = (name: string, value: any) => {
    name && setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const buildObjectToSend: IAuthPerson = {
      nombre: formData[INPUTNAMES.NAME],
      apellidos: formData[INPUTNAMES.SURNAME],
      celular: formData[INPUTNAMES.CELL_PHONE],
      email: formData[INPUTNAMES.EMAIL],
      token: login_info?.token ? login_info.token : TOKEN,
    };
    if (
      buildObjectToSend.apellidos !== "" &&
      buildObjectToSend.celular !== "" &&
      buildObjectToSend.email !== "" &&
      buildObjectToSend.nombre !== ""
    ) {
      dispatch(setAuthPerson(buildObjectToSend))
        .unwrap()
        .then(() =>
          dispatch(getAuthPerson(login_info?.token ? login_info.token : TOKEN))
        )
        .then(() => handleResetValues());
    } else toast.error("Todos los campos deben ser llenados");
  };

  const handleDeleteAuthPerson = (id: string) => {
    dispatch(deleteAuthPerson(id))
      .unwrap()
      .then(() =>
        dispatch(getAuthPerson(login_info?.token ? login_info.token : TOKEN))
      )
      .then(() => handleResetValues());
  };

  useEffect(() => {
    dispatch(getAuthPerson(login_info?.token ? login_info.token : TOKEN));
  }, [login_info]);

  return (
    <div className="grid md:grid-cols-2 gap-8 py-10 xl:pb-40">
      <TextField
        onInputUpdated={handleChangeInputs}
        size="small"
        label={INPUTLABELS.NAME}
        name={INPUTNAMES.NAME}
        required
        clear={resetValue}
      />
      <TextField
        onInputUpdated={handleChangeInputs}
        size="small"
        label={INPUTLABELS.SURNAME}
        clear={resetValue}
        name={INPUTNAMES.SURNAME}
        required
      />
      <TextField
        onInputUpdated={handleChangeInputs}
        size="small"
        label={INPUTLABELS.CELL_PHONE}
        clear={resetValue}
        name={INPUTNAMES.CELL_PHONE}
        required
      />
      <TextField
        onInputUpdated={handleChangeInputs}
        size="small"
        type="email"
        label={INPUTLABELS.EMAIL}
        clear={resetValue}
        name={INPUTNAMES.EMAIL}
        required
      />
      <div className="md:col-span-2">
        <Title
          title="Mis personas autorizadas"
          Tag="h6"
          color="light-violet"
          className="mb-5"
        />
        <Suspense loading={isLoading}>
          <ul className="grid md:grid-cols-2 gap-8">
            {aut_person?.length !== 0 ? (
              aut_person?.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center text-sm p-3 rounded-md shadow shadow-light-violet cursor-default"
                >
                  <span className="flex flex-wrap gap-y-1">
                    <p className="capitalize">
                      <AccountCircleRoundedIcon className="text-light-black" />{" "}
                      {item.nombre} {item.apellidos}
                    </p>
                    <p className="mx-5">
                      <EmailRoundedIcon className="text-light-black" />{" "}
                      {item.email}
                    </p>
                    <p>
                      <LocalPhoneRoundedIcon className="text-light-black" />{" "}
                      {item.celular}
                    </p>
                  </span>
                  <IconButton
                    className="ml-5"
                    onClick={() => handleDeleteAuthPerson(item.id)}
                  >
                    <CloseIcon className="text-red-800" />
                  </IconButton>
                </li>
              ))
            ) : (
              <EmptyList
                className="md:col-span-2"
                message="Usted actualmente no tiene ninguna persona autorizada."
              />
            )}
          </ul>
        </Suspense>
      </div>
      <div className="mt-20 flex flex-wrap md:col-span-2 justify-end gap-6">
        <Button
          text="Guardar"
          bgColor="light-violet"
          classNameLink="w-40"
          loading={isLoading}
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
