import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { isAuthenticated, selectUser } from "../features/auth/auth.slice";
import Protected from "./Protected";

const Sidebar = () => {
  const authenticated = useAppSelector(isAuthenticated);
  const user = useAppSelector(selectUser);

  const dashboardRedirectUrl =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "LIBRARIAN"
        ? "/librarian"
        : "/reader";

  return (
    <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-primary-900 text-white">
      <ul className="p-4 flex flex-col items-center  gap-4">
        <li>
          <Link to="/books">Browse Books</Link>
        </li>

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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
