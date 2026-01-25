import React, { useState } from "react";
import { MenuIcon, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-white tracking-wide">
          Readshere
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="/about" className="hover:text-white transition">About</a></li>
          <li><a href="/signup" className="hover:text-white transition">Signup</a></li>
          <li><a href="/login" className="hover:text-white transition">Login</a></li>
          <li><a href="/user-dashboard" className="hover:text-white transition">Dashboard</a></li>
        </ul>

        {/* Desktop Profile */}
        <div className="hidden md:flex">
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            Profile
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-4">
          <a href="/" className="block text-gray-300 hover:text-white">Home</a>
          <a href="/about" className="block text-gray-300 hover:text-white">About</a>
          <a href="/signup" className="block text-gray-300 hover:text-white">Signup</a>
          <a href="/user-dashboard" className="block text-gray-300 hover:text-white">Dashboard</a>

          <button className="w-full mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            Profile
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
