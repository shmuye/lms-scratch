import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import Protected from "./Protected";
import { logoutUser } from "../features/auth/auth.thunks";
import {
  BookOpen,
  LogIn,
  UserPlus,
  LayoutDashboard,
  PlusCircle,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  open?: boolean;
  onNavigate?: () => void;
};

const Sidebar = ({ open = true, onNavigate }: SidebarProps) => {
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const dashboardRedirectUrl =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "LIBRARIAN"
        ? "/librarian"
        : "/reader";

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const linkClass = (path: string) => {
    const isActive =
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path));

    return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-primary-700 text-white"
        : "text-primary-100 hover:bg-primary-800 hover:text-white"
    }`;
  };

  const handleNav = () => onNavigate?.();

  return (
    <nav
      className={`z-50 fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-primary-900 text-white flex flex-col justify-between shadow-xl
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
    >
      <div className="p-5 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-bold text-center tracking-wide text-primary-100">
          ReadSphere
        </h2>

        <div className="flex flex-col gap-1">
          <Link to="/books" className={linkClass("/books")} onClick={handleNav}>
            <BookOpen size={18} />
            <span>Browse Books</span>
          </Link>
        </div>

        {!authenticated && (
          <div className="flex flex-col gap-1">
            <Link to="/login" className={linkClass("/login")} onClick={handleNav}>
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className={linkClass("/signup")} onClick={handleNav}>
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        )}

        {authenticated && (
          <>
            <div className="flex items-center gap-3 border-b border-primary-800 pb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-600 text-white font-semibold">
                  {firstLetter}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-primary-300">{user?.role}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                to={dashboardRedirectUrl}
                className={linkClass(dashboardRedirectUrl)}
                onClick={handleNav}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </div>

            <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
              <div className="flex flex-col gap-1 border-t border-primary-800 pt-4">
                <p className="text-xs text-primary-400 uppercase px-2 tracking-wider">
                  Management
                </p>

                <Link
                  to="/create-book"
                  className={linkClass("/create-book")}
                  onClick={handleNav}
                >
                  <PlusCircle size={18} />
                  <span>Create Book</span>
                </Link>
              </div>
            </Protected>
          </>
        )}
      </div>

      {authenticated && (
        <div className="p-4 border-t border-primary-800">
          <button
            onClick={() => dispatch(logoutUser())}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
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
