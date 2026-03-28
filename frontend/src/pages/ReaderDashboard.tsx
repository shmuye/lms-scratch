import { Link, Outlet } from "react-router-dom";
const ReaderDashboard = () => {
  return (
    <>
      <h2 className="text-2xl text-center font-bold mb-4">Reader Dashboard</h2>
      <div className="w-[80%] flex justify-center">
        <ul className="flex gap-4">
          <li>
            <Link
              to="/reader/profile"
              className="text-blue-500 hover:underline"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/reader/borrowed"
              className="text-blue-500 hover:underline"
            >
              Borrowed Books
            </Link>
          </li>
        </ul>
      </div>
      <div className="relative">
        <Outlet />
      </div>
    </>
  );
};
export default ReaderDashboard;
