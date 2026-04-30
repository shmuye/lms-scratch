import { Link, Outlet, useLocation } from "react-router-dom";
import { User, BookOpen } from "lucide-react";

const ReaderDashboard = () => {
  const location = useLocation();

  const tabs = [
    { label: "Profile", path: "/reader/profile", icon: User },
    { label: "Borrowed Books", path: "/reader/borrowed", icon: BookOpen },
  ];

  return (
    <div className="">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Reader Dashboard
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="w-full flex gap-2 p-2 rounded-xl border border-primary-100 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-2 
                  rounded-lg text-sm font-medium whitespace-nowrap transition
                  ${
                    isActive
                      ? "bg-primary-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-primary-100"
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-primary-100 min-h-75 sm:min-h-100">
        <Outlet />
      </div>
    </div>
  );
};

export default ReaderDashboard;
