import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";

const NavBar = () => {
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);
  console.log(authenticated, user);

  return (
    <header className="flex justify-between items-center h-16 p-4 border-b border-slate-500 mb-4">
      <h1 className="text-xl font-bold text-gradient-to-r from-blue-500 to-yellow-500">
        ReadSphere
      </h1>
      <nav>
        <ul className="flex items-center  gap-4">
          <li>
            <Link to="/">Browse Books</Link>
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

          {authenticated && (
            <>
              <li>
                <Link to="/user-dashboard">Dashboard</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <SearchBar />
    </header>
  );
};

export default NavBar;
