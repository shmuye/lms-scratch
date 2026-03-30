import { Link, Outlet, useLocation } from "react-router-dom";
import { User, BookOpen } from "lucide-react";

const ReaderDashboard = () => {
  const location = useLocation();

  const tabs = [
    {
      label: "Profile",
      path: "/reader/profile",
      icon: User,
    },
    {
      label: "Borrowed Books",
      path: "/reader/borrowed",
      icon: BookOpen,
    },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-6">Reader Dashboard</h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-primary-100">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
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
      <div className="bg-white rounded-xl p-4 shadow-sm border border-primary-100 min-h-75">
        <Outlet />
      </div>
    </div>
  );
};

export default ReaderDashboard;
