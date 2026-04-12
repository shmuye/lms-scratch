import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateBook } from "../services/book.api";
import { updateBookRequest } from "../types/book.types";

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

  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] =
    useState<updateBookRequest["category"]>(category);
  const [newPublishedYear, setNewPublishedYear] = useState<number | undefined>(
    publishedYear,
  );
  const [newtotalCopies, setNewTotalCopies] = useState(totalCopies);
  const [newCover, setNewCover] = useState<File | null>(null);

  const { mutate, isPending, isError } = useMutation<
    any,
    unknown,
    { bookId: string; data: FormData }
  >({
    mutationFn: ({ bookId, data }) => updateBook(bookId, data),
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

  if (isError) return <div>Error editing book</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition"
        onClick={() => setOpenEditModal(false)}
      />

      {/* Modal */}
      <div className="relative w-[92%] sm:w-[90%] md:max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          Edit Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          {/* Author */}
          <div>
            <label className="label">Author</label>
            <input
              className="input"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
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
          <div>
            <label className="label">Published Year</label>
            <input
              type="number"
              className="input"
              value={newPublishedYear || ""}
              onChange={(e) =>
                setNewPublishedYear(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
          </div>

          {/* Total Copies */}
          <div>
            <label className="label">Total Copies</label>
            <input
              type="number"
              className="input"
              value={newtotalCopies}
              onChange={(e) => setNewTotalCopies(Number(e.target.value))}
            />
          </div>

          {/* Cover */}
          <div>
            <label className="label">Change Cover</label>
            <input
              type="file"
              accept="image/*"
              className="text-sm"
              onChange={(e) => setNewCover(e.target.files?.[0] || null)}
            />

            <img
              src={newCover ? URL.createObjectURL(newCover) : coverPage}
              alt="Preview"
              className="mt-3 h-28 w-full object-cover rounded-lg border"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              rows={3}
              className="input resize-none"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setOpenEditModal(false)}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-5 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 text-sm transition disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
