import { Search } from "lucide-react";

type searchProps = {
  search: string;
  setSearch: (value: string) => void;
  onSearch?: () => void;
};

const SearchBar = ({ search, setSearch, onSearch }: searchProps) => {
  return (
    <div className="w-full sm:max-w-md flex items-center gap-2 px-3 py-2 bg-gray-50 border border-primary-100 rounded-lg focus-within:ring-2 focus-within:ring-primary-500 transition">
      <button onClick={onSearch}>
        <Search className="text-primary-500 shrink-0" size={20} />
      </button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books..."
        className="flex-1 bg-transparent outline-none text-sm"
      />
    </div>
  );
};

export default SearchBar;
