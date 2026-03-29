import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import Protected from "./Protected";
import { logoutUser } from "../features/auth/auth.thunks";

// Lucide icons
import {
  BookOpen,
  LogIn,
  UserPlus,
  LayoutDashboard,
  User,
  Settings,
  PlusCircle,
  LogOut,
} from "lucide-react";

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

  // reusable link style
  const linkClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-800 transition";

  return (
    <nav className="z-50 fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-primary-900 text-white flex flex-col justify-between shadow-xl">
      {/* Top Section */}
      <div className="p-5 flex flex-col gap-6">
        {/* Logo */}
        <h2 className="text-xl font-bold text-center tracking-wide">
          📚 Library
        </h2>

        {/* Public */}
        <div className="flex flex-col gap-1">
          <Link to="/books" className={linkClass}>
            <BookOpen size={18} />
            <span>Browse Books</span>
          </Link>
        </div>

        {/* Guest */}
        {!authenticated && (
          <div className="flex flex-col gap-1">
            <Link to="/login" className={linkClass}>
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className={linkClass}>
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        )}

        {/* Authenticated */}
        {authenticated && (
          <>
            {/* User Info */}
            <div className="flex items-center gap-3 border-b border-primary-800 pb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-white font-semibold">
                  {firstLetter}
                </div>
              )}

              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-300">{user?.role}</p>
              </div>
            </div>

            {/* User Links */}
            <div className="flex flex-col gap-1">
              <Link to={dashboardRedirectUrl} className={linkClass}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>

              <Link to="/reader/profile" className={linkClass}>
                <User size={18} />
                <span>Profile</span>
              </Link>

              <Link to="/settings" className={linkClass}>
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </div>

            {/* Admin / Librarian */}
            <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
              <div className="flex flex-col gap-1 mt-3 border-t border-primary-800 pt-4">
                <p className="text-xs text-gray-400 uppercase px-2">
                  Management
                </p>

                <Link to="/create-book" className={linkClass}>
                  <PlusCircle size={18} />
                  <span>Create Book</span>
                </Link>
              </div>
            </Protected>
          </>
        )}
      </div>

      {/* Bottom */}
      {authenticated && (
        <div className="p-4 border-t border-primary-800">
          <button
            onClick={() => dispatch(logoutUser())}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-500 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
