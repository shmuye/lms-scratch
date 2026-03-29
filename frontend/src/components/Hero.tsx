import { homeImage } from "../assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${homeImage})`,
      }}
    >
      {/* Gradient overlay instead of flat black */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-primary-950/90 via-primary-900/70 to-black/70"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Make Reading <span className="text-primary-400">Your Habit</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 text-gray-200">
          Discover thousands of books, manage your collection, and track your
          reading journey effortlessly.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          {/* Primary button */}
          <Link
            to="/books"
            className="px-6 py-3 rounded-lg font-semibold bg-primary-500 hover:bg-primary-600 transition shadow-lg shadow-primary-500/30"
          >
            Browse Books
          </Link>

          {/* Secondary button */}
          <Link
            to="/signup"
            className="px-6 py-3 rounded-lg font-semibold border border-white/30 backdrop-blur-sm hover:bg-white/10 transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
