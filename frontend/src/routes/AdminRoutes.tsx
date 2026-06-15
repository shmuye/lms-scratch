import { useAppSelector } from "../hooks/hooks";
import {
  selectUser,
  selectAuthBootstrapping,
} from "../features/auth/auth.slice";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const AdminRoutes = () => {
  const user = useAppSelector(selectUser);
  const bootstrapping = useAppSelector(selectAuthBootstrapping);

  if (bootstrapping) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;
