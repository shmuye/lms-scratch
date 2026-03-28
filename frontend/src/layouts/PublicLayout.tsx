import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const PublicLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true); // default closed (mobile)
  return (
    <div className="min-h-screen flex flex-col">
      {openSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <NavBar setOpenSidebar={setOpenSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
