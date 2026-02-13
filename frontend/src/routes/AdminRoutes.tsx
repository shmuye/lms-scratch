import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  const user = useAppSelector(selectUser);

  if (user && user.role !== "ADMIN")
    return <Navigate to={`/${user.role.toLowerCase()}`} replace />;

  return <Outlet />;
};

export default AdminRoutes;
