/* eslint-disable @typescript-eslint/no-unused-vars */
import ribbon from "@/assets/waves/onda_slide.png";
import logo from "@/assets/login-register/logo_login.png";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { Button, Title } from "@/components";
import { PasswordField, SelectC, TextField } from "@/components/material_ui";
import { useState } from "react";
import { INPUTLABELS, INPUTNAMES, STATES } from "@/utils";
import { useNavigate } from "react-router-dom";
import { PathNames } from "@/config";

export const RegisterForm = () => {
  const [_formData, setFormData] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const navigate = useNavigate();
  const handleChangeInputs = (name: string, value: any) => {
    name && setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setDisabledButton(!checked);
  };

  return (
    <div className="w-full md:w-[550px] bg-white relative overflow-hidden p-10 shrink-0">
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

      <header>
        <img src={logo} alt="logo" className="w-40 relative" />
        <Title
          title="Haz crecer tu negocio con Liveo. Registra tu negocio"
          Tag="h6"
          color="light-violet"
          className="ml-1.5 mt-2"
        />
      </header>
      <Box component="form" className="relative my-10 flex flex-col gap-5">
        <TextField
          onInputUpdated={handleChangeInputs}
          label={INPUTLABELS.NAME_COMPANIE}
          name={INPUTNAMES.NAME}
        />

        <div className="grid grid-cols-2 gap-5">
          <SelectC
            label={INPUTLABELS.STATE}
            value=""
            name={INPUTNAMES.STATE}
            onInputUpdated={handleChangeInputs}
            options={STATES}
          />
          <TextField
            onInputUpdated={handleChangeInputs}
            label={INPUTLABELS.CITY}
            name={INPUTNAMES.CITY}
          />
          <TextField
            onInputUpdated={handleChangeInputs}
            label={INPUTLABELS.TYPE_SECTOR}
            name={INPUTNAMES.TYPE_SECTOR}
          />
          <TextField
            onInputUpdated={handleChangeInputs}
            label={INPUTLABELS.ACTIVITY_SECTOR}
            name={INPUTNAMES.ACTIVITY_SECTOR}
          />
        </div>

        <TextField
          onInputUpdated={handleChangeInputs}
          type="email"
          label={INPUTLABELS.EMAIL}
          name={INPUTNAMES.EMAIL}
          required
        />

        <TextField
          name={INPUTNAMES.CELL_PHONE}
          label={INPUTLABELS.CELL_PHONE}
          onInputUpdated={handleChangeInputs}
        />

        <div className="flex flex-col gap-5">
          <Title title="Datos de usuario" color="light-violet" Tag="h6" />
          <TextField
            onInputUpdated={handleChangeInputs}
            label={INPUTLABELS.NAME_USER}
            name={INPUTNAMES.NAME}
            required
          />
          <PasswordField
            name={INPUTNAMES.PASSWORD}
            label={INPUTLABELS.PASSWORD}
            onInputUpdated={handleChangeInputs}
          />
          <FormControlLabel
            className="text-sm ml-0 -mt-3"
            sx={{ ".css-ahj2mt-MuiTypography-root": { fontSize: "14px" } }}
            control={
              <Checkbox
                onChange={handleCheked}
                size="small"
                sx={{
                  color: "#422a79",
                  "&.Mui-checked": {
                    color: "#422a79",
                  },
                }}
              />
            }
            label={`Acepto las condiciones de uso y la política de privacidad liveo`}
          />
        </div>

        <Button
          // onClick={handleSubmit}
          // loading={loading}
          // border={loading}
          borderColor="light-violet"
          disabled={disabledButton}
          full
          text="Regístrate"
          bgColor="violet"
        />
      </Box>
    </div>
  );
};
