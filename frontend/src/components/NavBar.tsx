import { Menu, BookOpen, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { isAuthenticated } from "../features/auth/auth.slice";

interface NavBarProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setOpenSidebar }: NavBarProps) => {
  const authenticated = useAppSelector(isAuthenticated);

  const linkClass =
    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-200 transition";

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 h-16 px-4 flex justify-between items-center z-50 border-b border-primary-100 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-100 transition"
          onClick={() => setOpenSidebar((prev) => !prev)}
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-bold text-primary-500 tracking-wide">
            ReadSphere
          </h1>
        </Link>
      </div>
      <nav className="hidden md:flex items-center">
        <ul className="flex items-center gap-2">
          <li>
            <Link to="/books" className={linkClass}>
              <BookOpen size={18} />
              <span>Books</span>
            </Link>
          </li>

          {!authenticated && (
            <>
              <li>
                <Link to="/login" className={linkClass}>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 transition shadow-md shadow-primary-500/30"
                >
                  <UserPlus size={18} />
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
