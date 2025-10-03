import { Button, Modal, ModalProps } from "@mantine/core";

interface IConfirmationModal extends ModalProps {
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmationModal = ({
  onClose,
  onConfirm,
  loading,
  ...props
}: IConfirmationModal) => {
  return (
    <Modal
      centered
      onClose={onClose}
      classNames={{
        body: "flex gap-3 justify-center",
        content: "bg-background",
        header: "bg-background",
        close: "text-slate-400 hover:bg-transparent",
      }}
      {...props}
    >
      <Button onClick={onConfirm} loading={loading}>
        Yes
      </Button>
      <Button variant="outline" onClick={onClose}>
        No
      </Button>
    </Modal>
  );
};

export default ConfirmationModal;
