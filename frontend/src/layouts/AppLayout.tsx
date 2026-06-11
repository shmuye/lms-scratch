import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useState } from "react";

const AppLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {openSidebar && (
        <div
          className="fixed inset-0 top-16 bg-black/40 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
          aria-hidden
        />
      )}

      <Sidebar
        open={openSidebar}
        onNavigate={() => setOpenSidebar(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <NavBar setOpenSidebar={setOpenSidebar} />
        <main className="flex-1 md:ml-64 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
