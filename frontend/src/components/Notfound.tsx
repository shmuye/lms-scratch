import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="card card-body text-center max-w-md w-full flex flex-col items-center gap-6">
        <div className="empty-state-icon">
          <span className="text-2xl font-bold text-primary-600">404</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Page not found</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link to="/" className="btn-primary w-full sm:w-auto">
          <Home size={18} aria-hidden />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
