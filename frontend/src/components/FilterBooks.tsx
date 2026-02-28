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
    <div className="w-full max-w-[200px] px-4 py-3 overflow-x-auto">
      <div className="flex md:mb-0 md:flex-col gap-4 whitespace-nowrap">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition 
            ${
              selectedCategory === ""
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          All
        </button>

        {categoryEnum.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBooks;
