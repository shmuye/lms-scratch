import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Actions, EditModal, DeleteModal, Protected } from "./";

import { useMutation } from "@tanstack/react-query";
import { borrowBook, requestReturn } from "../services/borrow.api.ts";
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

  const { mutate: requestReturnMutate, isPending: isReturning } = useMutation({
    mutationFn: (id: string) => requestReturn(id),
    onSuccess: () => {
      showSuccess("Return request sent. Wait for approval.");
      queryClient.invalidateQueries({ queryKey: ["borrows"] });
    },
    onError: () => {
      showError("Failed to request return");
    },
  });

  return (
    <div className="bookCard group h-full">
      <div className="relative h-56 sm:h-60">
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
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2">{title}</h2>
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
                status === "Borrowed" ? "text-warning-700" : "text-success-700"
              }`}
            >
              Status: {status}
            </p>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-4 pt-0 flex justify-between gap-2 shrink-0 mt-auto">
        {mode !== "borrowed" && (
          <button
            onClick={() => mutate(id)}
            disabled={isPending || copiesAvailable === 0}
            className="btn-primary flex-1 w-full"
          >
            {isPending ? "Borrowing..." : "Borrow Book"}
          </button>
        )}

        {mode === "borrowed" && (
          <button
            onClick={() => requestReturnMutate(id)}
            disabled={isReturning || status !== "Borrowed"}
            className="btn-primary flex-1 w-full"
          >
            {status === "Return Requested"
              ? "Pending Approval"
              : "Request Return"}
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
