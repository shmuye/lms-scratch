import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/auth.thunks";
import { useAppDispatch } from "../hooks/hooks";
const links = [
  {
    label: "Profile",
    redirectUrl: "/profile",
  },
  {
    label: "Settings",
    redirectUrl: "/settings",
  },
];

const DashboardSidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2 absolute r-0 top-5 w-fit p-4 rounded-lg shadow-md">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <Link to={link.redirectUrl}>{link.label}</Link>
        ))}
      </ul>
      <Link to={"/"} onClick={() => dispatch(logoutUser())}>
        Logout
      </Link>
    </div>
  );
};

export default DashboardSidebar;
