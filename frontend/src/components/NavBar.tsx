import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import { useEffect, useState } from "react";
import { logoutUser } from "../features/auth/auth.thunks";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <button className="md:hidden">
        {menuOpen ? (
          <X onClick={() => setMenuOpen(false)} />
        ) : (
          <Menu onClick={() => setMenuOpen(true)} />
        )}
      </button>
      {menuOpen && (
        <nav className="md:hidden">
          <ul className="absolute z-[100] bg-gray-200 top-15 right-5 w-full max-w-[400px] h-[500px] rounded-sm flex flex-col items-center  gap-4">
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
      )}
    </header>
  );
};

export default NavBar;
