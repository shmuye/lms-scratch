import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReturnRequests, approveReturn } from "../services/borrow.api";
import { CheckCircle } from "lucide-react";
import { showSuccess, showError } from "../utils";
import Loader from "./Loader";

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
    },
    onError: () => {
      showError("Failed to approve return");
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading requests</p>;

  return (
    <div className="w-[80%] mx-auto p-6">
      <h2 className="text-xl font-bold mb-6">Return Requests</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <div className="grid gap-4">
          {data.map((borrow: any) => (
            <div
              key={borrow._id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-primary-100"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={borrow.book.coverPage}
                  className="w-16 h-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-semibold">{borrow.book.title}</h3>
                  <p className="text-sm text-gray-600">{borrow.book.author}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    Borrowed by: {borrow.user.name}
                  </p>
                </div>
              </div>

              {/* Right */}
              <button
                onClick={() => mutate(borrow.book._id)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <CheckCircle size={18} />
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReturnRequests;
