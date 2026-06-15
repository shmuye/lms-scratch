import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "../services/borrow.api";
import Loader from "./Loader";
import Badge, { borrowStatusVariant } from "./ui/Badge";
import { BookOpen } from "lucide-react";

const Borrows = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allBorrows"],
    queryFn: getAllBorrows,
  });

  if (isLoading) return <Loader label="Loading borrows..." />;

  if (isError) {
    return (
      <div className="empty-state">
        <p className="empty-state-title text-danger-600">Error loading borrows</p>
        <p className="empty-state-text">Please try again later.</p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No borrow records found</p>
        <p className="empty-state-text">Borrow activity will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="table-wrap hidden sm:block">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="table-th">Book</th>
              <th className="table-th">User</th>
              <th className="table-th">Borrowed</th>
              <th className="table-th">Due</th>
              <th className="table-th">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((borrow: any) => (
              <tr key={borrow._id} className="table-row">
                <td className="table-td">
                  <div className="flex items-center gap-3">
                    {borrow.book?.coverPage ? (
                      <img src={borrow.book.coverPage} alt="" className="w-9 h-12 object-cover rounded-md border border-slate-200" />
                    ) : (
                      <div className="w-9 h-12 rounded-md bg-slate-100 flex items-center justify-center">
                        <BookOpen size={14} className="text-slate-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-slate-900">{borrow.book?.title ?? "Unknown"}</p>
                      <p className="text-xs text-slate-500">{borrow.book?.author}</p>
                    </div>
                  </div>
                </td>
                <td className="table-td">{borrow.user?.name || "Unknown"}</td>
                <td className="table-td text-slate-500">
                  {new Date(borrow.borrowDate).toLocaleDateString()}
                </td>
                <td className="table-td text-slate-500">
                  {new Date(borrow.dueDate).toLocaleDateString()}
                </td>
                <td className="table-td">
                  <Badge variant={borrowStatusVariant(borrow.status)}>{borrow.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden flex flex-col gap-3">
        {data.map((borrow: any) => (
          <div key={borrow._id} className="data-card">
            <div className="flex gap-3">
              {borrow.book?.coverPage ? (
                <img src={borrow.book.coverPage} alt="" className="w-12 h-16 object-cover rounded-lg border border-slate-200 shrink-0" />
              ) : (
                <div className="w-12 h-16 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-slate-400" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900 truncate">{borrow.book?.title ?? "Unknown"}</p>
                <p className="text-xs text-slate-500">{borrow.book?.author}</p>
                <div className="mt-2">
                  <Badge variant={borrowStatusVariant(borrow.status)}>{borrow.status}</Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <p><span className="font-medium text-slate-700">User:</span> {borrow.user?.name || "Unknown"}</p>
              <p><span className="font-medium text-slate-700">Due:</span> {new Date(borrow.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrows;
