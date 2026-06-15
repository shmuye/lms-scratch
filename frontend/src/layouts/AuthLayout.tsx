import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="nav-header">
        <Link to="/" className="nav-brand">
          ReadSphere
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
