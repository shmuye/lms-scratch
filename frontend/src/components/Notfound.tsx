import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      <div className=" flex flex-col gap-8 text-center bg-white  p-10 max-w-md w-full">
        <h2 className="text-6xl font-extrabold text-primary-600 mb-4">404</h2>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>

        <Link
          to="/"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold
          hover:bg-primary-700 transition duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
