import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-2 max-w-[400px] border-1 border-gray-300 rounded-full">
      <input
        type="text"
        className={`${isOpen ? "flex" : "hidden"} md:flex border-none outline-none`}
        placeholder="Search Books"
      />
      <Search
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
        size={24}
      />
    </div>
  );
};

export default SearchBar;
