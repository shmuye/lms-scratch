import { ChevronDown } from "lucide-react";
import { BookCategory } from "../pages/BooksPage";
import { categoryEnum } from "../types/book.types";

type FilterBookProps = {
  selectedCategory: BookCategory | "";
  setSelectedCategory: React.Dispatch<React.SetStateAction<BookCategory | "">>;
};

const FilterBooks = ({
  selectedCategory,
  setSelectedCategory,
}: FilterBookProps) => {
  return (
    <div className="w-full min-w-0 md:w-48 lg:w-56 shrink-0 relative">
      <label htmlFor="category-filter" className="sr-only">Filter by category</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value as BookCategory)}
        className="select truncate"
      >
        <option value="">All Categories</option>
        {categoryEnum.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        aria-hidden
      />
    </div>
  );
};

export default FilterBooks;
