export interface ModalConfirmProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  buttonDeleteText?: string;
}
