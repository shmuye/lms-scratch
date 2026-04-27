import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "../services/borrow.api";
import Loader from "./Loader";

const Borrows = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allBorrows"],
    queryFn: getAllBorrows,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="text-center text-danger-500 py-10">
        Error loading borrows
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        No borrow records found
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto border border-primary-100 rounded-xl bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Borrow Date</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((borrow: any) => (
              <tr key={borrow._id} className="hover:bg-gray-50 transition">
                {/* Book */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={borrow.book?.coverPage}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {borrow.book?.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {borrow.book?.author}
                    </p>
                  </div>
                </td>

                {/* User */}
                <td className="px-4 py-3 text-gray-600">
                  {borrow.user?.name || "Unknown"}
                </td>

                {/* Dates */}
                <td className="px-4 py-3 text-gray-500">
                  {new Date(borrow.borrowDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {new Date(borrow.dueDate).toLocaleDateString()}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`
                      px-2 py-1 text-xs rounded-full
                      ${
                        borrow.status === "Borrowed"
                          ? "bg-warning-100 text-warning-700"
                          : borrow.status === "Returned"
                            ? "bg-success-100 text-success-700"
                            : borrow.status === "Return Requested"
                              ? "bg-info-100 text-info-700"
                              : "bg-danger-100 text-danger-700"
                      }
                    `}
                  >
                    {borrow.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {data.map((borrow: any) => (
          <div
            key={borrow._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3"
          >
            <div className="flex gap-3">
              <img
                src={borrow.book?.coverPage}
                className="w-14 h-20 object-cover rounded"
              />
              <div>
                <p className="font-medium">{borrow.book?.title}</p>
                <p className="text-xs text-gray-500">{borrow.book?.author}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">User:</span>{" "}
                {borrow.user?.name || "Unknown"}
              </p>
              <p>
                <span className="font-medium">Due:</span>{" "}
                {new Date(borrow.dueDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status:</span> {borrow.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrows;
