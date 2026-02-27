import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users.api";
import { User } from "../types/auth.types";

const Users = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>{`Error: ${error.message}`}</div>;
  }
  return (
    <div className="overflow-x-auto w-[80%] mx-auto m-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: User) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{user._id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
