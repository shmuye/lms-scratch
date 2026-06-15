import { Search } from "lucide-react";

type searchProps = {
  search: string;
  setSearch: (value: string) => void;
  onSearch?: () => void;
};

const SearchBar = ({ search, setSearch, onSearch }: searchProps) => {
  return (
    <div className="w-full min-w-0 md:flex-1 md:max-w-md">
      <label htmlFor="book-search" className="sr-only">Search books</label>
      <div className="input-icon-wrap">
        <button
          type="button"
          onClick={onSearch}
          className="text-primary-600 hover:text-primary-700 shrink-0"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <input
          id="book-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
