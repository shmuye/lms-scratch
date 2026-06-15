import { Menu, BookOpen, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { isAuthenticated } from "../features/auth/auth.slice";

interface NavBarProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setOpenSidebar }: NavBarProps) => {
  const authenticated = useAppSelector(isAuthenticated);
  const location = useLocation();

  const linkClass = (path: string) =>
    `nav-link ${location.pathname === path ? "nav-link-active" : ""}`;

  return (
    <header className="nav-header">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="btn-icon md:hidden"
          onClick={() => setOpenSidebar((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={false}
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="nav-brand">
          ReadSphere
        </Link>
      </div>

      <nav className="hidden md:flex items-center" aria-label="Main navigation">
        <ul className="flex items-center gap-1">
          <li>
            <Link to="/books" className={linkClass("/books")}>
              <BookOpen size={18} aria-hidden />
              <span>Books</span>
            </Link>
          </li>

          {!authenticated && (
            <>
              <li>
                <Link to="/login" className={linkClass("/login")}>
                  <LogIn size={18} aria-hidden />
                  <span>Sign In</span>
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn-primary btn-sm ml-1">
                  <UserPlus size={16} aria-hidden />
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
