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
  publishedYear: number;
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
  const [newDescription, setNewDescription] = useState<string | null>(
    description,
  );
  const [newCategory, setNewCategory] = useState<string>(category);
  const [newPublishedYear, setNewPublishedYear] =
    useState<number>(publishedYear);
  const [NewtotalCopies, setNewTotalCopies] = useState<number>(totalCopies);
  const { mutate, isPending, isError } = useMutation<
    any,
    unknown,
    { bookId: string; data: updateBookRequest }
  >({
    mutationFn: ({ bookId, data }) => updateBook(bookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  const handleEdit = (
    bookId,
    data: {
      newTitle;
      newAuthor;
      newDecription;
      newCategory;
      newPublishedYear;
      newTotalCopies;
    },
  ) => {
    mutate(bookId, data);
  };

  if (isError) {
    return <div>Error editing book</div>;
  }

  return <div></div>;
};

export default EditModal;
