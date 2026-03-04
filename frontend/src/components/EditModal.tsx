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
    useState<updateBookRequest["category"]>("Fiction");
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Edit Book</h2>

        <input
          className="input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          className="input"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />

        <textarea
          className="input"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <input
          type="number"
          className="input"
          value={newtotalCopies}
          onChange={(e) => setNewTotalCopies(Number(e.target.value))}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            {isPending ? "Updating..." : "Update"}
          </button>

          <button
            onClick={() => setOpenEditModal(false)}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
