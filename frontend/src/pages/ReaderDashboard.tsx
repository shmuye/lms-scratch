import { Link, Outlet, useLocation } from "react-router-dom";
import { User, BookOpen } from "lucide-react";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";

const ReaderDashboard = () => {
  const location = useLocation();

  const tabs = [
    { label: "Profile", path: "/reader/profile", icon: User },
    { label: "Borrowed Books", path: "/reader/borrowed", icon: BookOpen },
    { label: "Borrow History", path: "/reader/history", icon: BookOpen },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Reader Dashboard"
        subtitle="View your profile and borrowed books"
      />

      <div className="tabs w-full sm:w-fit overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`tab flex items-center gap-2 whitespace-nowrap ${isActive ? "tab-active" : ""}`}
            >
              <Icon size={18} />
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="card card-body min-h-48">
        <Outlet />
      </div>
    </PageContainer>
  );
};

export default ReaderDashboard;
