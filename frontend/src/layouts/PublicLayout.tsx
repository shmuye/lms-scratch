import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
