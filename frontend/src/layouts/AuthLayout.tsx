import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 h-16 px-4 flex items-center z-50 border-b border-primary-100 shadow-sm">
        <Link to="/" className="text-xl font-bold text-primary-600 tracking-wide">
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
