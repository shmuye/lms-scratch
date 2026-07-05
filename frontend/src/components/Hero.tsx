import { homeImage } from "../assets";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 min-h-[calc(100vh-4rem)] w-screen flex items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${homeImage})`,
        backgroundAttachment: "fixed",
      }}
      aria-label="Welcome to ReadSphere"
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-900/80 via-primary-950/75 to-slate-900/85" />

      <div className="relative z-10 max-w-3xl py-12 sm:py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-200 text-xs sm:text-sm font-medium mb-6">
          <Sparkles size={14} aria-hidden />
          Your personal library, reimagined
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-6 leading-tight text-white tracking-tight">
          Make Reading <span className="text-primary-300">Your Habit</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-slate-200 max-w-xl mx-auto leading-relaxed">
          Discover thousands of books, manage your collection, and track your
          reading journey — all in one place.
        </p>

        <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
          <Link
            to="/books"
            className="btn-primary px-6 py-3 text-base shadow-lg shadow-primary-900/30"
          >
            <BookOpen size={18} aria-hidden />
            Browse Books
          </Link>

          <Link
            to="/signup"
            className="btn px-6 py-3 text-base border border-white/25 text-white backdrop-blur-sm hover:bg-white/10"
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
