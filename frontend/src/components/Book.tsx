import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import EditModal from "./EditModal.tsx";
import DeleteModal from "./DeleteModal.tsx";
import Actions from "./Actions.tsx";
import Protected from "./Protected.tsx";
import { useMutation } from "@tanstack/react-query";
import { borrowBook } from "../services/borrow.api.ts";
import { showError, showSuccess } from "../utils.ts";
import { useQueryClient } from "@tanstack/react-query";

type BookProps = {
  id: string;
  title: string;
  mode?: "default" | "borrowed";
  author: string;
  coverPage: string;
  description?: string;
  totalCopies: number;
  copiesAvailable: number;
  category: string;
  publishedYear?: number;

  borrowDate?: string;
  dueDate?: string;
  status?: string;
};

const Book = ({
  id,
  title,
  author,
  mode = "default",
  coverPage,
  description,
  totalCopies,
  copiesAvailable,
  category,
  publishedYear,
  borrowDate,
  dueDate,
  status,
}: BookProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => borrowBook(id),
    onSuccess: () => {
      showSuccess(
        "Book borrowed successfully, Make sure to take it with in the next 24 hours",
      );
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: () => {
      showError("An Error Occurred , Please Try again");
    },
  });

  return (
    <div className="bookCard group">
      {/* Book top section */}
      <div className="relative h-62.5">
        <img
          className="w-full h-full object-cover"
          src={coverPage}
          alt="book coverpage"
        />
        <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
          <button
            className="flex items-center justify-center absolute w-8 h-8 top-5 right-5 rounded-full bg-gray-600"
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            <MoreVertical className="text-white w-4 h-4" />
          </button>
        </Protected>

        {openDropDown && (
          <Actions
            setOpenDropDown={setOpenDropDown}
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenEditModal={setOpenEditModal}
          />
        )}
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
        {mode !== "borrowed" && (
          <>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Total Copies: </span>
              {totalCopies}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Available: </span>
              {copiesAvailable}
            </p>
          </>
        )}
        <p className="text-sm text-gray-600">
          <span className="font-bold">Category: </span>
          {category}
        </p>

        {mode === "borrowed" && (
          <>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Borrowed: </span>
              {new Date(borrowDate!).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-bold">Due Date: </span>
              {new Date(dueDate!).toLocaleDateString()}
            </p>

            <p
              className={`text-sm font-semibold ${
                status === "Borrowed" ? "text-yellow-600" : "text-green-600"
              }`}
            >
              Status: {status}
            </p>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-4 flex justify-between gap-2 shrink-0">
        {mode !== "borrowed" && (
          <button
            onClick={() => mutate(id)}
            disabled={isPending || copiesAvailable === 0}
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            Borrow Book
          </button>
        )}

        {mode === "borrowed" && (
          <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition cursor-pointer">
            Return Book
          </button>
        )}
      </div>

      {openDeleteModal && (
        <DeleteModal
          bookId={id}
          setOpenDropDown={setOpenDropDown}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {openEditModal && (
        <EditModal
          bookId={id}
          title={title}
          description={description ?? ""}
          category={category}
          author={author}
          coverPage={coverPage}
          totalCopies={totalCopies}
          publishedYear={publishedYear}
          setOpenDropDown={setOpenDropDown}
          setOpenEditModal={setOpenEditModal}
        />
      )}
    </div>
  );
};

export default Book;
