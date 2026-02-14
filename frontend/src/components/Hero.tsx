import { homeImage } from "../assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-white text-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${homeImage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Make Reading Your Habit
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Discover thousands of books, manage your collection, and track your
          reading journey effortlessly.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/books"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
          >
            Browse Books
          </Link>

          <Link
            to="/signup"
            className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-3 rounded-lg font-semibold text-black"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
