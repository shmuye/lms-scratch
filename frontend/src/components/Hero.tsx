import { homeImage } from "../assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4 sm:px-6 relative bg-cover bg-center -m-4 sm:-m-6"
      style={{
        backgroundImage: `url(${homeImage})`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-primary-950/70 to-black/80" />

      <div className="relative z-10 max-w-2xl py-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg">
          Make Reading{" "}
          <span className="text-primary-400 drop-shadow-md">Your Habit</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-200 max-w-xl mx-auto">
          Discover thousands of books, manage your collection, and track your
          reading journey effortlessly.
        </p>

        <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
          <Link to="/books" className="btn-primary px-6 py-3 shadow-lg shadow-primary-600/30">
            Browse Books
          </Link>

          <Link
            to="/signup"
            className="btn px-6 py-3 border border-white/30 text-white backdrop-blur-sm hover:bg-white/10"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
