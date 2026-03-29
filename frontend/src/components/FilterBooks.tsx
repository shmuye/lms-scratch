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
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 my-4">
      {/* Label */}
      <h2 className="text-lg font-semibold text-gray-700">
        Filter by Category
      </h2>

      {/* Select Wrapper */}
      <div className="relative w-full md:w-64">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as BookCategory)}
          className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm font-medium 
          bg-white border border-primary-100 
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

        {/* Custom dropdown icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-primary-500">
          ▼
        </div>
      </div>
    </div>
  );
};

export default FilterBooks;
