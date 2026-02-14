import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import { useEffect } from "react";

const NavBar = () => {
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);
  console.log(authenticated, user);

  useEffect(() => {
    if (!user) return;
  });

  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-500">
      <h1 className="text-xl font-bold">ReadSphere</h1>
      <SearchBar />
      <nav>
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
    </header>
  );
};

export default NavBar;
