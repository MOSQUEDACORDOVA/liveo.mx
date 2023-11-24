import { Button, Title } from "@/components";
import { CloseRounded } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { FC } from "react";
import { ModalConfirmProps as Props } from "./modal-confirm.types";

const ModalConfirm: FC<Props> = (props) => {
  const { open, title, onClose, buttonDeleteText = "Eliminar" } = props;
  const { onConfirm } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl relative p-6">
        <IconButton onClick={onClose} className="absolute right-2 top-2 z-10">
          <CloseRounded />
        </IconButton>
        <div className="flex flex-col gap-6 m-6">
          <Title title={title} Tag="h6" color="light-violet" />
          <div className="flex gap-6">
            <Button
              classNameLink="min-w-[100px]"
              bgColor="light-violet"
              text={buttonDeleteText}
              onClick={onConfirm}
            />
            <Button
              classNameLink="min-w-[100px]"
              bgColor="none"
              text="Cancelar"
              border
              borderColor="light-violet"
              textColor="light-violet"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
