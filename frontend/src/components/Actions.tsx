import { Edit2, Trash2 } from "lucide-react";

type actionProps = {
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Actions = ({
  setOpenDeleteModal,
  setOpenEditModal,
  setOpenDropDown,
}: actionProps) => {
  return (
    <div className="dropdown-menu" role="menu">
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setOpenEditModal(true);
          setOpenDropDown(false);
        }}
        className="dropdown-item"
      >
        <Edit2 size={16} aria-hidden />
        Edit
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setOpenDeleteModal(true);
          setOpenDropDown(false);
        }}
        className="dropdown-item-danger"
      >
        <Trash2 size={16} aria-hidden />
        Delete
      </button>
    </div>
  );
};

export default Actions;
