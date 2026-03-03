import React from "react";

type DeleteModalProps = {
  onDelete: (id: string) => void;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  onDelete,
  setOpenDeleteModal,
  setOpenDropDown,
  bookId,
}) => {
  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Delete
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>
        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setOpenDeleteModal(false);
              setOpenDropDown(false);
            }}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(bookId);
              setOpenDeleteModal(false);
              setOpenDropDown(false);
            }}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
