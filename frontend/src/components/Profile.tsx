import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="mx-auto p-4 w-fit flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-bold text-gray-600">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          value={user?.name || ""}
          readOnly
          className="border rounded-md px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-bold text-gray-600">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          value={user?.email || ""}
          readOnly
          className="border rounded-md px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>
    </div>
  );
};

export default Profile;
