import { Edit2, Trash2 } from "lucide-react";

type actionProps = {
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Actions: React.FC<actionProps> = ({
  setOpenDeleteModal,
  setOpenEditModal,
  setOpenDropDown,
}) => {
  return (
    <div className="absolute right-0 top-12 z-40 w-40 rounded-xl bg-white shadow-lg border border-gray-100 p-2 animate-in fade-in zoom-in-95">
      <button
        onClick={() => {
          setOpenEditModal(true);
          setOpenDropDown(false);
        }}
        className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Edit2 size={18} />
        Edit
      </button>

      <button
        onClick={() => {
          setOpenDeleteModal(true);
          setOpenDropDown(false);
        }}
        className="flex w-full items-center gap-3 px-3 py-2 text-sm text-danger-500 rounded-lg hover:bg-danger-100 transition-colors"
      >
        <Trash2 size={18} />
        Delete
      </button>
    </div>
  );
};

export default Actions;
