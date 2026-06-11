import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md card card-body flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Your Profile
        </h3>

        <div className="flex flex-col gap-1">
          <label className="label">Name</label>
          <input
            type="text"
            value={user?.name || ""}
            readOnly
            className="input bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Role</label>
          <input
            type="text"
            value={user?.role || ""}
            readOnly
            className="input bg-gray-50 capitalize"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
