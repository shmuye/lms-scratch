import { Edit2, Trash2 } from "lucide-react";

const Actions = () => {
  return (
    <div className="absolute right-0 top-12 w-40 rounded-xl bg-white shadow-lg border border-gray-100 p-2 animate-in fade-in zoom-in-95">
      <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
        <Edit2 size={18} />
        Edit
      </button>

      <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 transition-colors">
        <Trash2 size={18} />
        Delete
      </button>
    </div>
  );
};

export default Actions;
