import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  activateUser,
  deactivateUser,
  deleteUser,
} from "../services/users.api";
import { User } from "../types/auth.types";
import Loader from "./Loader";
import { showError, showSuccess } from "../utils";
import Badge from "./ui/Badge";

let numberOfUsers = 0;

const Users = () => {
  const queryClient = useQueryClient();

  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  numberOfUsers = users?.length ?? 0;

  const activateMutation = useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      showSuccess("User activated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => showError("Can't activate user"),
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => {
      showSuccess("User deactivated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => showError("Error deactivating a user"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      showSuccess("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => showError("Error deleting a user"),
  });

  if (isLoading) return <Loader label="Loading users..." />;

  if (error instanceof Error) {
    return (
      <div className="empty-state">
        <p className="empty-state-title text-danger-600">Failed to load users</p>
        <p className="empty-state-text">{error.message}</p>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No users found</p>
        <p className="empty-state-text">Users will appear here once registered.</p>
      </div>
    );
  }

  const roleBadge = (role: string) => {
    if (role === "ADMIN") return "danger" as const;
    if (role === "LIBRARIAN") return "info" as const;
    return "neutral" as const;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-3 sm:hidden">
        {users.map((user: User) => (
          <div key={user._id} className="data-card">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={roleBadge(user.role)}>{user.role}</Badge>
                <Badge variant={user.isActive ? "success" : "warning"}>
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              {user.isActive ? (
                <button type="button" onClick={() => deactivateMutation.mutate(user._id)} className="btn-secondary btn-sm flex-1">
                  Deactivate
                </button>
              ) : (
                <button type="button" onClick={() => activateMutation.mutate(user._id)} className="btn-success btn-sm flex-1">
                  Activate
                </button>
              )}
              <button type="button" onClick={() => deleteMutation.mutate(user._id)} className="btn-danger btn-sm flex-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="table-wrap hidden sm:block">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="table-th">Name</th>
              <th className="table-th">Email</th>
              <th className="table-th">Role</th>
              <th className="table-th">Status</th>
              <th className="table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id} className="table-row">
                <td className="table-td font-medium text-slate-900">{user.name}</td>
                <td className="table-td">{user.email}</td>
                <td className="table-td">
                  <Badge variant={roleBadge(user.role)}>{user.role}</Badge>
                </td>
                <td className="table-td">
                  <Badge variant={user.isActive ? "success" : "warning"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="table-td">
                  <div className="flex justify-end gap-2">
                    {user.isActive ? (
                      <button type="button" onClick={() => deactivateMutation.mutate(user._id)} className="btn-secondary btn-sm">
                        Deactivate
                      </button>
                    ) : (
                      <button type="button" onClick={() => activateMutation.mutate(user._id)} className="btn-success btn-sm">
                        Activate
                      </button>
                    )}
                    <button type="button" onClick={() => deleteMutation.mutate(user._id)} className="btn-danger btn-sm">
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
export { numberOfUsers };
