import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateBook } from "../services/book.api";
import { updateBookRequest } from "../types/book.types";
import { useQueryClient } from "@tanstack/react-query";

type editProps = {
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: string;
  title: string;
  author: string;
  coverPage: string;
  description: string;
  totalCopies: number;
  category: string;
  publishedYear?: number;
};

const EditModal: React.FC<editProps> = ({
  setOpenEditModal,
  setOpenDropDown,
  bookId,
  title,
  author,
  coverPage,
  description,
  totalCopies,
  category,
  publishedYear,
}) => {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newAuthor, setNewAuthor] = useState<string>(author);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newCategory, setNewCategory] =
    useState<updateBookRequest["category"]>(category);
  const [newPublishedYear, setNewPublishedYear] = useState<number | undefined>(
    publishedYear,
  );
  const [newtotalCopies, setNewTotalCopies] = useState<number>(totalCopies);
  const [newCover, setNewCover] = useState<File | null>(null);
  const { mutate, isPending, isError } = useMutation<
    any,
    unknown,
    { bookId: string; data: FormData }
  >({
    mutationFn: ({ bookId, data }: { bookId: string; data: FormData }) =>
      updateBook(bookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setOpenEditModal(false);
      setOpenDropDown(false);
    },
  });
  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", newTitle);
    formData.append("author", newAuthor);
    formData.append("description", newDescription || "");
    formData.append("category", newCategory ?? "");
    formData.append("publishedYear", String(newPublishedYear));
    formData.append("totalCopies", String(newtotalCopies));

    if (newCover) {
      formData.append("coverPage", newCover);
    }

    mutate({ bookId, data: formData });
  };

  if (isError) {
    return <div>Error editing book</div>;
  }

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpenEditModal(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              className="input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          {/* Author */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Author
            </label>
            <input
              className="input"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              className="input"
              value={newCategory}
              onChange={(e) =>
                setNewCategory(e.target.value as updateBookRequest["category"])
              }
            >
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Education">Education</option>
              <option value="Biography">Biography</option>
              <option value="Sport">Sport</option>
            </select>
          </div>

          {/* Published Year */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Published Year
            </label>
            <input
              type="number"
              className="input"
              value={newPublishedYear}
              onChange={(e) =>
                setNewPublishedYear(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
          </div>

          {/* Total Copies */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Total Copies
            </label>
            <input
              type="number"
              className="input"
              value={newtotalCopies}
              onChange={(e) => setNewTotalCopies(Number(e.target.value))}
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Change Cover
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewCover(e.target.files?.[0] || null)}
            />

            {/* Preview */}
            <img
              src={newCover ? URL.createObjectURL(newCover) : coverPage}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded-lg border"
            />
          </div>

          {/* Description Full Width */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="input resize-none"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setOpenEditModal(false)}
            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
