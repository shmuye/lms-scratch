import { useState } from "react";
import { MoreVertical, BookOpen } from "lucide-react";
import { Actions, EditModal, DeleteModal, Protected } from "./";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrowBook, requestReturn } from "../services/borrow.api.ts";
import { showError, showSuccess } from "../utils.ts";
import Badge, { borrowStatusVariant } from "./ui/Badge";

type BookProps = {
  id: string;
  title: string;
  mode?: "default" | "borrowed" | "history";
  author: string;
  coverPage: string;
  description?: string;
  totalCopies: number;
  copiesAvailable: number;
  category: string;
  publishedYear?: number;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
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
  returnDate,
  status,
}: BookProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [imgError, setImgError] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (bookId: string) => borrowBook(bookId),
    onSuccess: () => {
      showSuccess("Book borrowed successfully. Pick it up within 24 hours.");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: () => showError("An error occurred. Please try again."),
  });

  const { mutate: requestReturnMutate, isPending: isReturning } = useMutation({
    mutationFn: (bookId: string) => requestReturn(bookId),
    onSuccess: () => {
      showSuccess("Return request sent. Wait for approval.");
      queryClient.invalidateQueries({ queryKey: ["borrows"] });
    },
    onError: () => showError("Failed to request return"),
  });

  return (
    <article className="bookCard group h-full">
      <div className="relative h-56 sm:h-60 bg-slate-100">
        {!imgError && coverPage ? (
          <img
            className="w-full h-full object-cover"
            src={coverPage}
            alt={`Cover of ${title}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
            <BookOpen size={32} aria-hidden />
            <span className="text-xs">No cover</span>
          </div>
        )}

        {mode !== "borrowed" && (
          <span className="absolute top-3 left-3 badge-primary shadow-sm">
            {category}
          </span>
        )}

        {mode === "default" && copiesAvailable === 0 && (
          <span className="absolute bottom-3 left-3 badge-danger shadow-sm">
            Unavailable
          </span>
        )}

        <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
          <div className="absolute top-3 right-3">
            <button
              type="button"
              className="btn-icon bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
              onClick={() => setOpenDropDown(!openDropDown)}
              aria-label="Book actions"
              aria-expanded={openDropDown}
            >
              <MoreVertical size={16} />
            </button>
            {openDropDown && (
              <Actions
                setOpenDropDown={setOpenDropDown}
                setOpenDeleteModal={setOpenDeleteModal}
                setOpenEditModal={setOpenEditModal}
              />
            )}
          </div>
        </Protected>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-base font-semibold text-slate-900 line-clamp-2 leading-snug">
          {title}
        </h2>
        <p className="text-sm text-slate-500 line-clamp-1">by {author}</p>

        {description && mode === "default" && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {mode === "default" && (
          <p className="text-xs text-slate-500 mt-auto">
            <span className="font-medium text-slate-700">{copiesAvailable}</span> of{" "}
            <span className="font-medium text-slate-700">{totalCopies}</span> available
          </p>
        )}
        {(mode === "borrowed" || mode === "history") && (
          <div className="space-y-1.5 mt-auto">
            {borrowDate && (
              <p className="text-xs text-slate-500">
                Borrowed {new Date(borrowDate).toLocaleDateString()}
              </p>
            )}
            {dueDate && (
              <p className="text-xs text-slate-500">Due {new Date(dueDate).toLocaleDateString()}</p>
            )}
            {mode === "history" && (typeof ({} as any).returnDate !== "undefined") && (
              // returnDate prop may be undefined; show if provided via props
              (returnDate ? (
                <p className="text-xs text-slate-500">Returned {new Date(returnDate).toLocaleDateString()}</p>
              ) : null)
            )}
            {status && <Badge variant={borrowStatusVariant(status)}>{status}</Badge>}
          </div>
        )}
      </div>

      <div className="p-4 pt-0 shrink-0">
        {mode === "default" && (
          <button
            type="button"
            onClick={() => mutate(id)}
            disabled={isPending || copiesAvailable === 0}
            className="btn-primary w-full"
          >
            {isPending ? "Borrowing..." : copiesAvailable === 0 ? "Unavailable" : "Borrow Book"}
          </button>
        )}

        {mode === "borrowed" && (
          <button
            type="button"
            onClick={() => requestReturnMutate(id)}
            disabled={isReturning || status !== "Borrowed"}
            className="btn-primary w-full"
          >
            {status === "Return Requested" ? "Pending Approval" : "Request Return"}
          </button>
        )}
      </div>

      {openDeleteModal && (
        <DeleteModal bookId={id} setOpenDropDown={setOpenDropDown} setOpenDeleteModal={setOpenDeleteModal} />
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
    </article>
  );
};

export default Book;
