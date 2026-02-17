import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import { useEffect } from "react";
import { logoutUser } from "../features/auth/auth.thunks";

const NavBar = () => {
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);
  console.log(authenticated, user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
  });

  const dashboardRedirectUrl =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "LIBRARIAN"
        ? "/librarian"
        : "/reader";

  return (
    <header className="h-16 px-4 flex justify-between items-center border-b border-slate-500">
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
              {(user?.role === "ADMIN" || user?.role === "LIBRARIAN") && (
                <li>
                  <Link to={"/create-book"}>Create Book</Link>
                </li>
              )}
              <li>
                <Link to={dashboardRedirectUrl}>Dashboard</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logoutUser())}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
