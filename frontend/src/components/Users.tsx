import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  activateUser,
  deactivateUser,
  deleteUser,
} from "../services/users.api";
import { User } from "../types/auth.types";
import Loader from "./Loader";

const Users = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  console.log("Fetched users:", users); // Debugging log
  // ✅ Mutations
  const activateMutation = useMutation({
    mutationFn: activateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading) return <Loader />;

  if (error instanceof Error) {
    return (
      <div className="text-center text-danger-500 py-10">
        Error: {error.message}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="text-center py-10 text-gray-500">No users found</div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:hidden">
        {users.map((user: User) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3"
          >
            <div>
              <p className="text-xs text-gray-400">ID</p>
              <p className="text-sm text-gray-600">
                {user._id.slice(0, 10)}...
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => activateMutation.mutate(user._id)}
                className="flex-1 bg-success-100 text-success-700 py-1.5 rounded-lg text-xs"
              >
                Activate
              </button>

              <button
                onClick={() => deactivateMutation.mutate(user._id)}
                className="flex-1 bg-warning-100 text-warning-700 py-1.5 rounded-lg text-xs"
              >
                Deactivate
              </button>

              <button
                onClick={() => deleteMutation.mutate(user._id)}
                className="flex-1 bg-danger-100 text-danger-700 py-1.5 rounded-lg text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP (Table) ================= */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

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

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => activateMutation.mutate(user._id)}
                      className="px-3 py-1 text-xs rounded-md bg-success-100 text-success-700 hover:bg-success-200"
                    >
                      Activate
                    </button>

                    <button
                      onClick={() => deactivateMutation.mutate(user._id)}
                      className="px-3 py-1 text-xs rounded-md bg-warning-100 text-warning-700 hover:bg-warning-200"
                    >
                      Deactivate
                    </button>

                    <button
                      onClick={() => deleteMutation.mutate(user._id)}
                      className="px-3 py-1 text-xs rounded-md bg-danger-100 text-danger-700 hover:bg-danger-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
