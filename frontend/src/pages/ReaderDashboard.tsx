import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";
const ReaderDashboard = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};
export default ReaderDashboard;
