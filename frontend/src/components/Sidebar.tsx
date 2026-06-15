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

    return `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;
  };

  const handleNav = () => onNavigate?.();

  return (
    <nav
      aria-label="Sidebar navigation"
      className={`sidebar
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
    >
      <div className="p-5 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        <div className="text-center">
          <p className="text-lg font-bold tracking-tight text-white">ReadSphere</p>
          <p className="text-xs text-primary-200/80 mt-0.5">Library Management</p>
        </div>

        <div className="flex flex-col gap-1">
          <Link to="/books" className={linkClass("/books")} onClick={handleNav}>
            <BookOpen size={18} aria-hidden />
            <span>Browse Books</span>
          </Link>
        </div>

        {!authenticated && (
          <div className="flex flex-col gap-1">
            <Link to="/login" className={linkClass("/login")} onClick={handleNav}>
              <LogIn size={18} aria-hidden />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className={linkClass("/signup")} onClick={handleNav}>
              <UserPlus size={18} aria-hidden />
              <span>Sign Up</span>
            </Link>
          </div>
        )}

        {authenticated && (
          <>
            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-400/50"
                />
              ) : (
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-600 text-white font-semibold text-sm"
                  aria-hidden
                >
                  {firstLetter}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                <p className="text-xs text-primary-200/90 capitalize">{user?.role?.toLowerCase()}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                to={dashboardRedirectUrl}
                className={linkClass(dashboardRedirectUrl)}
                onClick={handleNav}
              >
                <LayoutDashboard size={18} aria-hidden />
                <span>Dashboard</span>
              </Link>
            </div>

            <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
                <p className="text-[10px] text-primary-200/70 uppercase px-3 tracking-widest font-semibold mb-1">
                  Management
                </p>

                <Link
                  to="/create-book"
                  className={linkClass("/create-book")}
                  onClick={handleNav}
                >
                  <PlusCircle size={18} aria-hidden />
                  <span>Create Book</span>
                </Link>
              </div>
            </Protected>
          </>
        )}
      </div>

      {authenticated && (
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => dispatch(logoutUser())}
            className="sidebar-link w-full text-red-300 hover:bg-red-500/10 hover:text-red-200"
          >
            <LogOut size={18} aria-hidden />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
