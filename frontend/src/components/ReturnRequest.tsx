import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReturnRequests, approveReturn } from "../services/borrow.api";
import { BookOpen, CheckCircle } from "lucide-react";
import { showSuccess, showError } from "../utils";
import Loader from "./Loader";

type ReturnRequestBorrow = {
  _id: string;
  book?: {
    _id: string;
    title?: string;
    author?: string;
    coverPage?: string;
  } | null;
  user?: {
    name?: string;
  } | null;
};

const ReturnRequests = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["returnRequests"],
    queryFn: getReturnRequests,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => approveReturn(id),
    onSuccess: () => {
      showSuccess("Return approved successfully");
      queryClient.invalidateQueries({ queryKey: ["returnRequests"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["myBorrows"] });
    },
    onError: () => {
      showError("Failed to approve return");
    },
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="empty-state text-danger-500">
        <p className="empty-state-title">Error loading requests</p>
        <p className="empty-state-text">Please try again later.</p>
      </div>
    );
  }

  const requests = ((data as ReturnRequestBorrow[]) ?? []).filter(
    (borrow) => borrow.book?._id && borrow.user,
  );

  if (!requests.length) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No pending requests</p>
        <p className="empty-state-text">
          Return requests will appear here when readers submit them.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {requests.map((borrow) => (
        <div
          key={borrow._id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 card p-4"
        >
          <div className="flex items-center gap-4 min-w-0">
            {borrow.book?.coverPage ? (
              <img
                src={borrow.book.coverPage}
                alt={borrow.book.title ?? "Book cover"}
                className="w-14 h-20 sm:w-16 sm:h-20 object-cover rounded-lg shrink-0"
              />
            ) : (
              <div className="w-14 h-20 sm:w-16 sm:h-20 rounded-lg shrink-0 bg-gray-100 flex items-center justify-center">
                <BookOpen className="text-gray-400" size={24} />
              </div>
            )}

            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {borrow.book?.title ?? "Unknown book"}
              </h3>
              <p className="text-sm text-gray-600">
                {borrow.book?.author ?? "Unknown author"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Borrowed by: {borrow.user?.name ?? "Unknown user"}
              </p>
            </div>
          </div>

          <button
            onClick={() => mutate(borrow.book!._id)}
            disabled={isPending}
            className="btn-success shrink-0 w-full sm:w-auto"
          >
            <CheckCircle size={18} />
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReturnRequests;
