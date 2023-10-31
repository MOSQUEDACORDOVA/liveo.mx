import { Divider, IconButton, Modal } from "@mui/material";
import { DateField, Stepper, TextField } from "./material_ui";
import { INPUTLABELS, INPUTNAMES } from "@/utils";
import { PayMethods, Terms } from ".";
import { useEffect, useState } from "react";
import {
  INotifyDeceased,
  IVerifyAuthPerson,
  verifyDeceased,
  verifyAuthPerson,
  reportDeceased,
} from "@/features/LoginRegisterUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/features/store";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  IByReportDeceasedPerson,
  INotificationDeceasedPerson,
  getConfigurations,
  selectAmountToReportDeceasedPerson,
  selectShowReportDeceased,
  setByReportDeceasedPerson,
  setNotificationDeceasedPerson,
  setShowReportDeceased,
} from "@/features/HomeSlice";
import { IRADIOVALUES, RADIOVALUES } from "./PayMethods";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Paragraph } from "@/layout";
import { ISteps } from "./material_ui/Stepper";

const INITIAL_FORM_DATA = {
  [INPUTNAMES.EMAIL]: "",
  [INPUTNAMES.NAME]: "",
  [INPUTNAMES.SURNAME]: "",
  [INPUTNAMES.BIRTH_DATE]: null,
};

export const ReportDeceased = () => {
  const dispatch = useDispatch<AppDispatch>();
  const showReportModal = useSelector(selectShowReportDeceased);
  const [dataUser, setDataUser] = useState(INITIAL_FORM_DATA);
  const [disabledButton, setDisabledButton] = useState(true);
  const [folioSummary, setFolioSummary] = useState("");
  const [authData, setAuthData] = useState({
    id: "",
    nombre: "",
    apellidos: "",
    celular: "",
    user_id: "",
    email: "",
  });
  const [radioValue, setRadioValue] = useState<IRADIOVALUES>(
    RADIOVALUES.DEBIT_CARD_PAY
  );
  const amount = useSelector(selectAmountToReportDeceasedPerson);

  const handleCheked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setDisabledButton(!checked);
  };

  const handleChangeInputs = (name: string, value: any) => {
    name && setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAuthPerson = async () => {
    const data: IVerifyAuthPerson = {
      email: dataUser[INPUTNAMES.EMAIL],
      nombre: dataUser[INPUTNAMES.NAME],
      apellidos: dataUser[INPUTNAMES.SURNAME],
    };
    if (data.email !== "" && data.nombre !== "" && data.apellidos !== "") {
      const resp = await dispatch(verifyAuthPerson(data))
        .unwrap()
        .then((resp) => {
          setAuthData(resp.data);
          setDataUser(INITIAL_FORM_DATA);
          setDisabledButton(true);
          return true;
        })
        .catch(() => false);
      return resp;
    } else {
      toast.error("Todos los campos deben ser llenados");
      return false;
    }
  };

  const handleSubmitVerifyDeceasedPerson = async () => {
    const data: INotifyDeceased = {
      nacimiento: dayjs(dataUser[INPUTNAMES.BIRTH_DATE]).format("YYYY-MM-DD"),
      name: dataUser[INPUTNAMES.NAME],
      apellido: dataUser[INPUTNAMES.SURNAME],
      id: authData.id,
    };

    if (
      dayjs(data.nacimiento).isValid() &&
      data.name !== "" &&
      data.apellido !== ""
    ) {
      const resp = await dispatch(verifyDeceased(data))
        .unwrap()
        .then((res) => res);
      resp && setDisabledButton(true);
      return resp;
    } else {
      toast.error("Todos los campos deben ser llenados");
      return false;
    }
  };

  const handleOnChangeRadio = (radio: IRADIOVALUES) => setRadioValue(radio);

  const handleSubmitBy = async () => {
    const data: IByReportDeceasedPerson = {
      estado: "Pendiente",
      metodo: radioValue,
      persona_autorizada_id: authData.id,
      monto: amount,
    };
    const data_report_deceased: INotifyDeceased = {
      nacimiento: dayjs(dataUser[INPUTNAMES.BIRTH_DATE]).format("YYYY-MM-DD"),
      name: dataUser[INPUTNAMES.NAME],
      apellido: dataUser[INPUTNAMES.SURNAME],
      id: authData.id,
    };
    const data_notify_deceased: INotificationDeceasedPerson = {
      persona_autorizada_id: authData.id,
      apellidos: authData.apellidos,
      email: authData.email,
      nombre: authData.nombre,
      user_id: authData.user_id,
    };
    const resp = await dispatch(setByReportDeceasedPerson(data))
      .unwrap()
      .then(() => dispatch(reportDeceased(data_report_deceased)))
      .then(() => {
        return dispatch(setNotificationDeceasedPerson(data_notify_deceased))
          .unwrap()
          .then((resp) => setFolioSummary(resp.obj.id))
          .then(() => true);
      })
      .catch(() => false);
    return resp;
  };

  const handleFinished = async () => {
    const finish = new Promise(() => dispatch(setShowReportDeceased(false)));
    return await finish.then(() => true);
  };

  const TotalCalc = (Number(amount) + Number(amount) * Number(0.16)).toFixed(2);

  const dataTableSummary = [
    `#${folioSummary}`,
    dayjs().format("DD/MM/YYYY"),
    `$${TotalCalc}`,
    radioValue,
  ];

  useEffect(() => {
    dispatch(getConfigurations());
  }, []);

  const steps: ISteps[] = [
    {
      label: "Persona autorizada",
      disabled_btn: disabledButton,
      onClick: () => handleSubmitAuthPerson(),
      description: (
        <AuthPerson
          values={dataUser}
          checked={handleCheked}
          handleChangeInputs={handleChangeInputs}
        />
      ),
    },
    {
      label: "Persona fallecida",
      disabled_btn: disabledButton,
      onClick: () => handleSubmitVerifyDeceasedPerson(),
      description: (
        <DeceasedPerson
          values={dataUser}
          checked={handleCheked}
          handleChangeInputs={handleChangeInputs}
        />
      ),
    },
    {
      label: "Formas de pago",
      disabled_btn: false,
      onClick: () => handleSubmitBy(),
      description: (
        <PayMethods
          onChangeRadio={handleOnChangeRadio}
          not_free
          title={`Debe realizar un depósito de ${amount} MXN`}
          className="my-4"
        />
      ),
    },
    {
      label: "Resumen",
      disabled_btn: false,
      onClick: () => handleFinished(),
      description: (
        <Summary amount={amount} dataTableSummary={dataTableSummary} />
      ),
    },
  ];

  return (
    <Modal
      open={showReportModal}
      onClose={() => dispatch(setShowReportDeceased(false))}
      className="flex justify-center items-center overflow-hidden"
    >
      <div className="relative h-[95dvh] bg-white w-[90%] lg:w-[80%] 2xl:w-[60%] rounded-xl p-5 overflow-y-auto">
        <IconButton
          onClick={() => dispatch(setShowReportDeceased(false))}
          className="absolute right-5 z-10"
        >
          <CloseRoundedIcon />
        </IconButton>
        <Stepper steps={steps} />
      </div>
    </Modal>
  );
};

type IForms = {
  handleChangeInputs: (name: string, value: any) => void;
  values: typeof INITIAL_FORM_DATA;
  checked: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthPerson = ({ handleChangeInputs, values, checked }: IForms) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="grid sm:grid-cols-2 gap-6 w-full">
        <TextField
          required
          label={INPUTLABELS.NAME}
          name={INPUTNAMES.NAME}
          onInputUpdated={handleChangeInputs}
          value={values[INPUTNAMES.NAME]}
        />
        <TextField
          required
          label={INPUTLABELS.SURNAME}
          name={INPUTNAMES.SURNAME}
          onInputUpdated={handleChangeInputs}
          value={values[INPUTNAMES.SURNAME]}
        />
        <TextField
          className="sm:col-span-2"
          required
          label={INPUTLABELS.EMAIL}
          name={INPUTNAMES.EMAIL}
          onInputUpdated={handleChangeInputs}
          value={values[INPUTNAMES.EMAIL]}
        />
      </div>

      <Terms className="text-xs" onChange={checked} />
    </div>
  );
};

const DeceasedPerson = ({ handleChangeInputs, values, checked }: IForms) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="grid sm:grid-cols-2 gap-6 w-full">
        <TextField
          required
          label={INPUTLABELS.NAME}
          name={INPUTNAMES.NAME}
          onInputUpdated={handleChangeInputs}
          value={values[INPUTNAMES.NAME]}
        />
        <TextField
          required
          label={INPUTLABELS.SURNAME}
          name={INPUTNAMES.SURNAME}
          onInputUpdated={handleChangeInputs}
          value={values[INPUTNAMES.SURNAME]}
        />
        <DateField
          className="sm:col-span-2"
          value={values[INPUTNAMES.BIRTH_DATE]}
          onInputUpdated={handleChangeInputs}
          size="small"
          label={INPUTLABELS.BIRTH_DATE}
          name={INPUTNAMES.BIRTH_DATE}
          maxDate={dayjs()}
          format="DD-MM-YYYY"
        />
      </div>

      <Terms className="text-xs" onChange={checked} />
    </div>
  );
};

type ISummary = {
  dataTableSummary: string[];
  amount: string;
};

const Summary = ({ dataTableSummary, amount }: ISummary) => {
  return (
    <section className="flex flex-col items-center my-4 -translate-x-[0.8rem]">
      <header className="flex items-center flex-col">
        <CheckCircleRoundedIcon className="w-28 h-28 text-light-violet" />
        <span className="flex gap-2 flex-col items-center text-center">
          <h4 className="text-violet font-bold max-w-[600px] text-center leading-none">
            Tu pago se ha realizado con{" "}
            <span className="text-ocean">éxito</span>!
          </h4>
          <Paragraph>
            En cuestión de minutos recibirás un correo con el usuario y
            contraseña con el cual podrías ingresar a la cuenta.
          </Paragraph>
        </span>
      </header>

      <table className="w-full mt-10 grid grid-cols-2 md:grid-cols-1 border-b-2 border-violet md:border-none pb-4 md:pb-0">
        <thead>
          <tr className="grid md:grid-cols-4 gap-10 md:gap-32 md:border-b-2 sm:border-violet text-left text-violet text-xl font-bold md:mb-4 md:pb-4">
            <th>No. Orden</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Forma de pago</th>
          </tr>
        </thead>
        <tbody className="grid md:grid-cols-4 gap-10 md:gap-32">
          {dataTableSummary.map((item, index) => (
            <tr key={index} className="">
              <td>
                <Paragraph>{item}</Paragraph>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-1 w-full mt-4">
        <Divider className="border mb-4 hidden md:block" />
        <span className="flex justify-between text-2xl font-bold">
          <p className="">IVA</p>
          <p className="">{"$0.16"}</p>
        </span>
        <span className="flex justify-between text-2xl font-bold">
          <p className="">Subtotal</p>
          <p className="">{`${amount}.00 MXN`}</p>
        </span>
      </div>
    </section>
  );
};
