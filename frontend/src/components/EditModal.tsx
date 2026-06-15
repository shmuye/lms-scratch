import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateBook } from "../services/book.api";
import { updateBookRequest } from "../types/book.types";
import { showError, showSuccess } from "../utils";
import Modal from "./ui/Modal";

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

const EditModal = ({
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
}: editProps) => {
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

  const close = () => {
    setOpenEditModal(false);
    setOpenDropDown(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookId, data }: { bookId: string; data: FormData }) =>
      updateBook(bookId, data),
    onSuccess: () => {
      showSuccess("Book updated successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      close();
    },
    onError: () => {
      showError("Failed to update book");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("author", newAuthor);
    formData.append("description", newDescription || "");
    formData.append("category", newCategory ?? "");
    formData.append("publishedYear", String(newPublishedYear));
    formData.append("totalCopies", String(newtotalCopies));
    if (newCover) formData.append("coverPage", newCover);
    mutate({ bookId, data: formData });
  };

  return (
    <Modal
      title="Edit Book"
      size="lg"
      onClose={close}
      footer={
        <>
          <button type="button" onClick={close} className="btn-secondary w-full sm:w-auto">
            Cancel
          </button>
          <button
            type="submit"
            form="edit-book-form"
            disabled={isPending}
            className="btn-primary w-full sm:w-auto"
          >
            {isPending ? "Updating..." : "Save Changes"}
          </button>
        </>
      }
    >
      <form id="edit-book-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="edit-title">Title</label>
            <input id="edit-title" className="input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="edit-author">Author</label>
            <input id="edit-author" className="input" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="edit-category">Category</label>
            <select id="edit-category" className="select" value={newCategory} onChange={(e) => setNewCategory(e.target.value as updateBookRequest["category"])}>
              {["Fiction", "Science", "Technology", "History", "Education", "Biography", "Sport"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="edit-year">Published Year</label>
            <input id="edit-year" type="number" className="input" value={newPublishedYear || ""} onChange={(e) => setNewPublishedYear(e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <label className="label" htmlFor="edit-copies">Total Copies</label>
            <input id="edit-copies" type="number" className="input" value={newtotalCopies} onChange={(e) => setNewTotalCopies(Number(e.target.value))} />
          </div>
          <div>
            <label className="label" htmlFor="edit-cover">Change Cover</label>
            <input id="edit-cover" type="file" accept="image/*" className="file-input" onChange={(e) => setNewCover(e.target.files?.[0] || null)} />
            <img src={newCover ? URL.createObjectURL(newCover) : coverPage} alt="Cover preview" className="mt-3 h-28 w-full object-cover rounded-lg border border-slate-200" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="edit-desc">Description</label>
          <textarea id="edit-desc" rows={3} className="input resize-none" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
