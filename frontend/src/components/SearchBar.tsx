import { Search } from "lucide-react";
import { useState } from "react";

type searchProps = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchBar = ({ search, setSearch }: searchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-2 max-w-100 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary-500">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`${isOpen ? "flex" : "hidden"} md:flex border-none outline-none`}
        placeholder="Search Books"
      />
      <Search
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer text-primary-500"
        size={24}
      />
    </div>
  );
};

export default SearchBar;
