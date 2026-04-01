import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md bg-white border border-primary-100 rounded-xl shadow-sm p-6 flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Your Profile
        </h3>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-500">Name</label>
          <input
            type="text"
            value={user?.name || ""}
            readOnly
            className="input bg-gray-50"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-500">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
