/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Title } from "@/components";
import { PasswordField, TextField } from "@/components/material_ui";
import { INPUTLABELS, INPUTNAMES } from "@/utils";

import { useState } from "react";

export const Login = () => {
  const [dataUser, setDataUser] = useState({
    [INPUTNAMES.PASSWORD]: "",
    [INPUTNAMES.EMAIL]: "",
  });

  const handleChangeInputs = (name: string, value: any) => {
    name && setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      data-aos="fade-right"
      className="text-center max-w-[500px] p-8 bg-white rounded-2xl"
    >
      <Title title="Acceso Empresas" color="violet" Tag="h5" />
      {/* EMAIL */}
      <div className="flex flex-col gap-6 mt-8">
        <TextField
          required
          label={INPUTLABELS.EMAIL}
          name={INPUTNAMES.EMAIL}
          onInputUpdated={handleChangeInputs}
          value={dataUser[INPUTNAMES.EMAIL]}
        />
        {/* END */}
        {/* PASSWORD */}
        <PasswordField
          label={INPUTLABELS.PASSWORD}
          name={INPUTNAMES.PASSWORD}
          onInputUpdated={handleChangeInputs}
          value={dataUser[INPUTNAMES.PASSWORD]}
        />
        {/* END */}
        <Button text="Iniciar Sesión" bgColor="light-violet" full />
      </div>
    </div>
  );
};
