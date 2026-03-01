import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks.ts";
import { selectUser } from "../features/auth/auth.slice.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../services/book.api.ts";
import { MoreVertical } from "lucide-react";
import EditModal from "./EditModal.tsx";
import DeleteModal from "./DeleteModal.tsx";
import Actions from "./Actions.tsx";

type BookProps = {
  id: string;
  title: string;
  author: string;
  coverPage: string;
  description?: string;
  totalCopies: number;
  copiesAvailable: number;
  category: string;
};

const Book: React.FC<BookProps> = ({
  id,
  title,
  author,
  coverPage,
  description,
  totalCopies,
  copiesAvailable,
  category,
}) => {
  const queryClient = useQueryClient();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });

  const user = useAppSelector(selectUser);
  console.log(user);
  const hasAccess = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <div className="bookCard group">
      {/* Book top section */}
      <div className="relative h-62.5">
        <img
          className="w-full h-full object-cover"
          src={coverPage}
          alt="book coverpage"
        />

        <button
          className="absolute top-5 right-5"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          <MoreVertical size={24} className="text-gray-300" />
        </button>

        {openDropDown && <Actions />}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Author: </span>
          {author}
        </p>
        {description && (
          <p className="text-sm text-gray-600">
            <span className="font-bold">Description: </span>
            {description}
          </p>
        )}
        <p className="text-sm text-gray-600">
          <span className="font-bold">Total Copies: </span>
          {totalCopies}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Available: </span>
          {copiesAvailable}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Category: </span>
          {category}
        </p>
      </div>

      {/* Action buttons */}
      <div className="p-4 flex justify-between gap-2 shrink-0">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Borrow Book
        </button>
        <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
          Return Book
        </button>
      </div>
    </div>
  );
};

export default Book;
