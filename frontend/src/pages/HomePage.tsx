import React from "react";
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="max-w-3xl text-center space-y-6">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Readshere — Where Every Book Finds Its Reader
        </h1>

       
        <p className="text-base md:text-lg text-gray-300">
          From timeless classics to modern resources, Readshere makes accessing
          and managing books simple, fast, and reliable for everyone.
        </p>

      
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition cursor-pointer">
            Browse Books
          </button>

          <button 
            onClick={() => navigate('/signup')}
            className="px-6 py-3 rounded-xl border border-gray-400 text-gray-200 hover:bg-white hover:text-slate-900 transition cursor-pointer">
            Join Readshere
          </button>
        </div>
     </div>
    </div>
  );
};

export default HomePage;
