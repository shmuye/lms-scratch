import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import { useState } from "react";
import { logoutUser } from "../features/auth/auth.thunks";
import Protected from "./Protected";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const dashboardRedirectUrl =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "LIBRARIAN"
        ? "/librarian"
        : "/reader";

  return (
    <header className="h-16 px-4 flex justify-between items-center border-b border-slate-500">
      <Link to={`/`}>
        <h1 className="text-xl text-primary-500 font-bold cursor-pointer">
          ReadSphere
        </h1>
      </Link>

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
              <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <li>
                  <Link to={"/create-book"}>Create Book</Link>
                </li>
              </Protected>

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
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="md:hidden"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      {menuOpen && (
        <nav className="md:hidden sidebar">
          <ul className="flex flex-col items-center gap-8">
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
                <Protected allowedRoles={["ADMIN", "LIBRARIAN"]}>
                  <li>
                    <Link to={"/create-book"}>Create Book</Link>
                  </li>
                </Protected>
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
