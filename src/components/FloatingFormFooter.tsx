import {
  IVerifyAuthPerson,
  INotifyDeceased,
  verifyAuthPerson,
  verifyDeceased,
} from "@/features/LoginRegisterUser";
import { AppDispatch } from "@/features/store";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DateField, TextField } from "./material_ui";
import { Button, Terms, Title } from ".";
import dayjs from "dayjs";
import {
  selectShowReportDeceased,
  setShowReportDeceased,
} from "@/features/HomeSlice";

const FORM_POSITION = {
  DECEASED: "deceased",
  AUTH_PERSON: "auth_person",
} as const;

type IFORM_POSITION = (typeof FORM_POSITION)[keyof typeof FORM_POSITION];

const INITIAL_FORM_DATA = {
  [INPUTNAMES.EMAIL]: "",
  [INPUTNAMES.NAME]: "",
  [INPUTNAMES.SURNAME]: "",
  [INPUTNAMES.BIRTH_DATE]: null,
} as const;

export const FloatingFormFooter = () => {
  const [authPersonId, setAuthPersonId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [formPosition, setFormPosition] = useState<IFORM_POSITION>(
    FORM_POSITION.AUTH_PERSON
  );
  const showFloatingForm = useSelector(selectShowReportDeceased);

  const [dataUser, setDataUser] = useState(INITIAL_FORM_DATA);

  const handleChangeInputs = (name: string, value: any) => {
    name && setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    !showFloatingForm && setFormPosition(FORM_POSITION.AUTH_PERSON);
  }, [showFloatingForm]);

  const handleSubmit = () => {
    if (formPosition === FORM_POSITION.AUTH_PERSON) {
      const data: IVerifyAuthPerson = {
        email: dataUser[INPUTNAMES.EMAIL],
        nombre: dataUser[INPUTNAMES.NAME],
        apellidos: dataUser[INPUTNAMES.SURNAME],
      };
      if (data.email !== "" && data.nombre !== "" && data.apellidos !== "") {
        dispatch(verifyAuthPerson(data))
          .unwrap()
          .then((resp) => {
            setAuthPersonId(resp.id);
            setDataUser(INITIAL_FORM_DATA);
            setFormPosition(FORM_POSITION.DECEASED);
          });
      } else toast.error("Todos los campos deben ser llenados");
    }
    if (formPosition === FORM_POSITION.DECEASED) {
      const data: INotifyDeceased = {
        nacimiento: dayjs(dataUser[INPUTNAMES.BIRTH_DATE]).format("YYYY-MM-DD"),
        name: dataUser[INPUTNAMES.NAME],
        apellido: dataUser[INPUTNAMES.SURNAME],
        id: authPersonId,
      };

      if (
        dayjs(data.nacimiento).isValid() &&
        data.name !== "" &&
        data.apellido !== ""
      ) {
        dispatch(verifyDeceased(data))
          .unwrap()
          .then(() => dispatch(setShowReportDeceased(false)));
      } else toast.error("Todos los campos deben ser llenados");
    }
  };

  const [disabledButton, setDisabledButton] = useState(true);

  const handleCheked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setDisabledButton(!checked);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute -translate-y-1/2 top-0 left-0 ${
        showFloatingForm ? "translate-x-0" : "-translate-x-full"
      } duration-200 z-50`}
    >
      <div className="text-center max-w-[500px] p-8 bg-white rounded-2xl relative shadow-black shadow-md">
        <Title
          title={`${
            formPosition === FORM_POSITION.DECEASED
              ? "Persona fallecida"
              : formPosition === FORM_POSITION.AUTH_PERSON &&
                "Persona autorizada"
          }   
          `}
          color="violet"
          Tag="h5"
        />

        {formPosition === FORM_POSITION.AUTH_PERSON && (
          <div className="flex flex-col gap-6 mt-8">
            <TextField
              required
              label={INPUTLABELS.NAME}
              name={INPUTNAMES.NAME}
              onInputUpdated={handleChangeInputs}
              value={dataUser[INPUTNAMES.NAME]}
            />
            <TextField
              required
              label={INPUTLABELS.SURNAME}
              name={INPUTNAMES.SURNAME}
              onInputUpdated={handleChangeInputs}
              value={dataUser[INPUTNAMES.SURNAME]}
            />
            <TextField
              required
              label={INPUTLABELS.EMAIL}
              name={INPUTNAMES.EMAIL}
              onInputUpdated={handleChangeInputs}
              value={dataUser[INPUTNAMES.EMAIL]}
            />

            <Terms className="text-xs" onChange={handleCheked} />

            <Button
              disabled={disabledButton}
              text="Enviar"
              bgColor="light-violet"
              full
              onClick={handleSubmit}
            />
          </div>
        )}
        {formPosition === FORM_POSITION.DECEASED && (
          <div className="flex flex-col gap-6 mt-8">
            <TextField
              required
              label={INPUTLABELS.NAME}
              name={INPUTNAMES.NAME}
              onInputUpdated={handleChangeInputs}
              value={dataUser[INPUTNAMES.NAME]}
            />
            <TextField
              required
              label={INPUTLABELS.SURNAME}
              name={INPUTNAMES.SURNAME}
              onInputUpdated={handleChangeInputs}
              value={dataUser[INPUTNAMES.SURNAME]}
            />
            <DateField
              value={dataUser[INPUTNAMES.BIRTH_DATE]}
              onInputUpdated={handleChangeInputs}
              size="small"
              label={INPUTLABELS.BIRTH_DATE}
              name={INPUTNAMES.BIRTH_DATE}
              maxDate={dayjs()}
              format="DD-MM-YYYY"
            />

            <Terms className="text-xs" onChange={handleCheked} />

            <Button
              disabled={disabledButton}
              text="Enviar"
              bgColor="light-violet"
              full
              onClick={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};
