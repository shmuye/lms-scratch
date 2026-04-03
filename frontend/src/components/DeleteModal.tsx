import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteBook } from "../services/book.api";
import { AlertTriangle, X } from "lucide-react";
import { showError, showSuccess } from "../utils";

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

  const { mutate, isPending } = useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      showSuccess("Book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setOpenDeleteModal(false);
      setOpenDropDown(false);
    },
    onError: () => {
      showError("Failed to delete book");
    },
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpenDeleteModal(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-primary-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-danger-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Delete Book</h2>
          </div>

          <button
            onClick={() => setOpenDeleteModal(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Are you sure you want to delete this book? This action{" "}
          <span className="font-semibold text-danger-500">
            cannot be undone
          </span>
          .
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setOpenDeleteModal(false);
              setOpenDropDown(false);
            }}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => mutate(bookId)}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
            bg-danger-500 text-white hover:bg-danger-700 
            transition shadow-md shadow-danger-500/30 disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
