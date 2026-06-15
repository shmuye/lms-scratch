import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import {
  selectAuthBootstrapping,
  selectUser,
} from "../features/auth/auth.slice";
import Loader from "../components/Loader";
import { getDashboardPath } from "../utils/getDashboardPath";

const GuestRoutes = () => {
  const bootstrapping = useAppSelector(selectAuthBootstrapping);
  const user = useAppSelector(selectUser);

  if (bootstrapping) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;
