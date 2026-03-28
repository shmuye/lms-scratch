import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import Protected from "./Protected";
import { logoutUser } from "../features/auth/auth.thunks";

const Sidebar = () => {
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const dashboardRedirectUrl =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "LIBRARIAN"
        ? "/librarian"
        : "/reader";

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <nav className="z-50 fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-primary-900 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-4 flex flex-col gap-6">
        {/* Logo / Title */}
        <h2 className="text-xl font-bold text-center">Library</h2>

        {/* Public Links */}
        <div className="flex flex-col gap-2">
          <Link to="/books" className="hover:text-gray-300">
            Browse Books
          </Link>
        </div>

        {/* Guest Links */}
        {!authenticated && (
          <div className="flex flex-col gap-2">
            <Link to="/login" className="hover:text-gray-300">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
          </div>
        )}

        {/* Authenticated Section */}
        {authenticated && (
          <>
            {/* User Info */}
            <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-black font-semibold">
                  {firstLetter}
                </div>
              )}

              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </div>

            {/* User Links */}
            <div className="flex flex-col gap-2">
              <Link to={dashboardRedirectUrl} className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/reader/profile" className="hover:text-gray-300">
                Profile
              </Link>
              <Link to="/settings" className="hover:text-gray-300">
                Settings
              </Link>
            </div>

            {/* Admin / Librarian */}
            <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
              <div className="flex flex-col gap-2 mt-2 border-t border-gray-700 pt-4">
                <p className="text-xs text-gray-400 uppercase">Management</p>
                <Link to="/create-book" className="hover:text-gray-300">
                  Create Book
                </Link>
              </div>
            </Protected>
          </>
        )}
      </div>

      {/* Bottom Section */}
      {authenticated && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => dispatch(logoutUser())}
            className="w-full text-left text-red-400 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
