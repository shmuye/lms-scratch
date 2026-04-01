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
    <div className="w-full sm:max-w-xs relative">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value as BookCategory)}
        className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm 
        bg-gray-50 border border-primary-100 
        focus:outline-none focus:ring-2 focus:ring-primary-500 
        shadow-sm transition"
      >
        <option value="">All Categories</option>

        {categoryEnum.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Dropdown icon */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-primary-500">
        ▼
      </div>
    </div>
  );
};
export default FilterBooks;
