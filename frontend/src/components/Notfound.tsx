import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="card card-body text-center max-w-md w-full flex flex-col gap-6">
        <p className="text-6xl font-extrabold text-primary-600">404</p>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link to="/" className="btn-primary w-full sm:w-auto mx-auto">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
