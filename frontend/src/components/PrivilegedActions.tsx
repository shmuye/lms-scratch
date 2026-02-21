import { Edit2, Trash2 } from "lucide-react";

interface PrivilegedActionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivilegedActions = ({ isOpen, onClose }: PrivilegedActionsProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-10 right-0 w-40 bg-white border rounded-md shadow-lg flex flex-col z-10">
      <button
        className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
        onClick={onClose}
      >
        <Edit2 size={16} className="mr-2" /> Edit Book
      </button>
      <button
        className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600"
        onClick={onClose}
      >
        <Trash2 size={16} className="mr-2" /> Delete Book
      </button>
    </div>
  );
};

export default PrivilegedActions;
