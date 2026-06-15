import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";
import Badge from "./ui/Badge";

const Profile = () => {
  const user = useAppSelector(selectUser);

  const roleVariant = () => {
    if (user?.role === "ADMIN") return "danger" as const;
    if (user?.role === "LIBRARIAN") return "info" as const;
    return "primary" as const;
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md card card-body flex flex-col items-center gap-6">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt=""
            className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-50 border-2 border-white shadow-md"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full bg-primary-600 text-white text-2xl font-bold flex items-center justify-center ring-4 ring-primary-50 shadow-md"
            aria-hidden
          >
            {firstLetter}
          </div>
        )}

        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">{user?.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
          {user?.role && (
            <div className="mt-3">
              <Badge variant={roleVariant()}>{user.role}</Badge>
            </div>
          )}
        </div>

        <div className="w-full space-y-4">
          <div>
            <label className="label" htmlFor="profile-name">Name</label>
            <input id="profile-name" type="text" value={user?.name || ""} readOnly className="input-readonly" />
          </div>
          <div>
            <label className="label" htmlFor="profile-email">Email</label>
            <input id="profile-email" type="email" value={user?.email || ""} readOnly className="input-readonly" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
