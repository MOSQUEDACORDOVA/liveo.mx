import React, { useEffect, useState } from "react";
import { Title } from ".";
import { Divider, RadioGroup } from "@mui/material";
import { Radio, TextField } from "@/components/material_ui";

import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import MoneyOffRoundedIcon from "@mui/icons-material/MoneyOffRounded";
import paypal from "@/assets/pay/paypal.png";
import mercado_pago from "@/assets/pay/mercado_pago.png";
import { Paragraph } from "@/layout";
import { twMerge } from "tailwind-merge";

export const RADIOVALUES = {
  DEBIT_CARD_PAY: "Mercado Pago",
  ELECTRONIC_PAY: "Tarjeta de debito o credito",
  PAYPAL_PAY: "Paypal",
  FREE_SUB: "Subscripción gratuita",
} as const;

export type IRADIOVALUES = (typeof RADIOVALUES)[keyof typeof RADIOVALUES];

type IPayMethods = {
  disabled?: boolean;
  onChangeRadio: (radio: IRADIOVALUES) => void;
  not_free?: boolean;
  title?: string;
  className?: string;
};

export const PayMethods = ({
  disabled,
  onChangeRadio,
  not_free,
  title,
  className,
}: IPayMethods) => {
  const [radioValue, setRadioValue] = useState<IRADIOVALUES>(
    !disabled && disabled !== undefined
      ? RADIOVALUES.FREE_SUB
      : RADIOVALUES.DEBIT_CARD_PAY
  );

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value as IRADIOVALUES);
  };

  useEffect(() => {
    onChangeRadio(radioValue);
  }, [radioValue]);

  return (
    <div className={twMerge("border-2 p-6 rounded-xl", className)}>
      <header>
        <Title
          title={title ?? `Formas de pago`}
          Tag="h5"
          color="violet"
          className="mb-2.5"
        />
        <Divider className="bg-light-violet border-2" />
      </header>
      <RadioGroup value={radioValue} onChange={handleChangeRadio}>
        <div
          className={`pt-6 ${
            disabled !== undefined && !disabled && "opacity-50 select-none"
          }`}
        >
          <Radio
            disabled={disabled !== undefined && !disabled}
            value={RADIOVALUES.DEBIT_CARD_PAY}
            name="credit_card"
          >
            <img
              src={mercado_pago}
              alt="paypal"
              className="border rounded-lg w-10 h-10 mr-2 border-black"
            />
            <div className="">
              <Title
                title={RADIOVALUES.DEBIT_CARD_PAY}
                Tag="h6"
                color="violet"
                className=""
              />
              <Paragraph className="text-xs">
                Estas navegando en un sitio seguro y tus datos están protegidos
              </Paragraph>
            </div>
          </Radio>
          <form className="p-7 flex flex-col gap-6">
            <TextField
              disabled={disabled !== undefined && !disabled}
              label="Nombre como aparece en la tarjeta"
              name="name"
              size="small"
            />
            <TextField
              disabled={disabled !== undefined && !disabled}
              label="Número de tarjeta"
              name="card_number"
              size="small"
            />
            <span className="flex gap-6">
              <TextField
                disabled={disabled !== undefined && !disabled}
                label="Fecha de expedición (MM/AA)"
                name="expedition_date"
                size="small"
              />
              <TextField
                disabled={disabled !== undefined && !disabled}
                label="CVC"
                name="name"
                size="small"
              />
            </span>
          </form>
        </div>
        <div
          className={`${
            disabled !== undefined && !disabled && "opacity-50 select-none"
          }`}
        >
          <Radio
            disabled={disabled !== undefined && !disabled}
            value={RADIOVALUES.ELECTRONIC_PAY}
            name="qr"
          >
            <QrCode2RoundedIcon className="border rounded-lg p-2 w-10 h-10 mr-2 border-black text-black/80" />
            <div className="">
              <Title
                title={RADIOVALUES.ELECTRONIC_PAY}
                Tag="h6"
                color="violet"
                className=""
              />
            </div>
          </Radio>
        </div>
        <div
          className={`mt-5 ${
            disabled !== undefined && !disabled && "opacity-50 select-none"
          }`}
        >
          <Radio
            disabled={disabled !== undefined && !disabled}
            value={RADIOVALUES.PAYPAL_PAY}
            name="paypal"
          >
            <img
              src={paypal}
              alt="paypal"
              className="border rounded-lg w-10 h-10 mr-2 border-black"
            />
            <div className="">
              <Title
                title={RADIOVALUES.PAYPAL_PAY}
                Tag="h6"
                color="violet"
                className=""
              />
            </div>
          </Radio>
        </div>
        {!not_free && (
          <div
            className={`mt-5 ${
              disabled !== undefined && disabled && "opacity-50 select-none"
            }`}
          >
            <Radio
              disabled={disabled !== undefined && disabled}
              value={RADIOVALUES.FREE_SUB}
              name="free_sub"
            >
              <MoneyOffRoundedIcon className="border rounded-lg p-2 w-10 h-10 mr-2 border-black text-black/80" />
              <div className="">
                <Title
                  title={RADIOVALUES.FREE_SUB}
                  Tag="h6"
                  color="violet"
                  className=""
                />
              </div>
            </Radio>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};
