import { Button, Modal, ModalProps } from "@mantine/core";

interface IConfirmationModal extends ModalProps {
  onConfirm: () => void;
}

const ConfirmationModal = ({
  onClose,
  onConfirm,
  ...props
}: IConfirmationModal) => {
  return (
    <Modal
      centered
      onClose={onClose}
      classNames={{
        body: "flex gap-3 justify-center",
        content: "bg-background",
        header: "bg-background relative",
        title: "text-center w-[90%] mx-auto",
        close: "absolute right-1 top-1",
      }}
      {...props}
    >
      <Button onClick={onConfirm}>Yes</Button>
      <Button variant="outline" onClick={onClose}>
        No
      </Button>
    </Modal>
  );
};

export default ConfirmationModal;
