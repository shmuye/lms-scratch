import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import { useState } from "react";
import { logoutUser } from "../features/auth/auth.thunks";
import Protected from "./Protected";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
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
    <>
      <header className="sticky top-0 h-16 px-4 flex justify-between items-center border-b border-slate-500">
        <div className="h-full flex justify-center items-center gap-1">
          <button
            className="w-10 h-10 cursor-pointer"
            onClick={() => setOpenSidebar((prev) => !prev)}
          >
            <Menu />
          </button>
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
                    <button onClick={() => dispatch(logoutUser())}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </header>
      {openSidebar && <Sidebar />}
    </>
  );
};

export default NavBar;
