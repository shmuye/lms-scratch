import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Link to={"/"}>
        <h1 className="fixed w-full p-2 text-xl font-bold border-b border-b-gray-300">
          Readsphere
        </h1>
      </Link>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
