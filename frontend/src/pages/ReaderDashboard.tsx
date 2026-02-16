import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { NavBar } from "../components";

const ReaderDashboard = () => {
  return (
    <div className="relative">
      <NavBar />
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};
export default ReaderDashboard;
