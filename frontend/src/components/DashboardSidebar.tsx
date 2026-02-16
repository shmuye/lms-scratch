import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/auth.thunks";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";

const links = [
  {
    label: "Profile",
    redirectUrl: "/profile",
  },
  {
    label: "Settings",
    redirectUrl: "/settings",
  },
];

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="absolute right-2 top-16 w-60 bg-white py-6 px-6 rounded-lg shadow-md flex flex-col gap-4">
      {/* Avatar Section */}
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-lg font-semibold">
          {firstLetter}
        </div>
      )}

      {/* Links */}
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.redirectUrl}>
            <Link
              to={link.redirectUrl}
              className="hover:text-blue-600 transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={() => dispatch(logoutUser())}
        className="text-red-500 text-left hover:text-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardSidebar;
