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
    <div className="w-1/4 p-4">
      {/* Category / Genre dropdown */}
      <div className="mb-4">
        <label
          htmlFor="Category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="genre"
          name="genre"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as BookCategory)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          {categoryEnum.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBooks;
