import SearchBar from "./SearchBar";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { isAuthenticated } from "../features/auth/auth.slice";
interface NavBarProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ setOpenSidebar }: NavBarProps) => {
  const authenticated = useAppSelector(isAuthenticated);

  return (
    <>
      <header className="bg-primary-100 sticky top-0 h-16 px-4 flex justify-between shadow-sm shadow-primary-300 items-center z-50">
        <div className="h-full flex justify-center items-center gap-1">
          {
            <button
              className="md:hidden w-10 h-10 cursor-pointer"
              onClick={() => setOpenSidebar((prev) => !prev)}
            >
              <Menu />
            </button>
          }
          <Link to={`/`}>
            <h1 className="text-xl text-primary-500 font-bold cursor-pointer m-0">
              ReadSphere
            </h1>
          </Link>
        </div>
        <SearchBar />
        <nav className="hidden md:flex">
          <ul className="flex items-center  gap-4">
            <li>
              <Link to="/books">Browse Books</Link>
            </li>
            {!authenticated && (
              <>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
