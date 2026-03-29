import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useState } from "react";

const AppLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true); // default open (desktop)

  return (
    <div className="flex min-h-screen">
      {openSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col">
        <NavBar setOpenSidebar={setOpenSidebar} />
        <main className="p-6 md:ml-64 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
