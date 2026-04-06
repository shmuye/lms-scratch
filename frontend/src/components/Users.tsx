import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users.api";
import { User } from "../types/auth.types";
import Loader from "./Loader";

const Users = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <Loader />;

  if (error instanceof Error) {
    return (
      <div className="text-center text-danger-500 py-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          {/* Head */}
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y">
            {users.map((user: User) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-500">
                  {user._id.slice(0, 8)}...
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {!users?.length && (
        <div className="text-center py-10 text-gray-500">No users found</div>
      )}
    </div>
  );
};

export default Users;
