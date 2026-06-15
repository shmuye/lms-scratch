import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../services/book.api";
import { AlertTriangle } from "lucide-react";
import { showError, showSuccess } from "../utils";
import Modal from "./ui/Modal";

type DeleteModalProps = {
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: string;
};

const DeleteModal = ({
  setOpenDeleteModal,
  setOpenDropDown,
  bookId,
}: DeleteModalProps) => {
  const queryClient = useQueryClient();

  const close = () => {
    setOpenDeleteModal(false);
    setOpenDropDown(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      showSuccess("Book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      close();
    },
    onError: () => {
      showError("Failed to delete book");
    },
  });

  return (
    <Modal
      title="Delete Book"
      size="sm"
      onClose={close}
      icon={<AlertTriangle className="text-danger-500 shrink-0" size={20} aria-hidden />}
      footer={
        <>
          <button type="button" onClick={close} className="btn-secondary w-full sm:w-auto">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => mutate(bookId)}
            disabled={isPending}
            className="btn-danger w-full sm:w-auto"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete this book? This action{" "}
        <span className="font-semibold text-danger-600">cannot be undone</span>.
      </p>
    </Modal>
  );
};

export default DeleteModal;
