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
  // return (
  //   <div className="w-full md:h-screen md:w-50 px-4 py-3 overflow-x-auto md:bg-primary-900">
  //     <div className="flex md:mb-0 md:flex-col gap-4 whitespace-nowrap">
  //       <button
  //         onClick={() => setSelectedCategory("")}
  //         className={`px-4 py-2 rounded-sm text-sm font-medium transition
  //           ${
  //             selectedCategory === ""
  //               ? "bg-primary-500 text-white"
  //               : "bg-primary-50 hover:bg-primary-100"
  //           }`}
  //       >
  //         All
  //       </button>

  //       {categoryEnum.map((category) => (
  //         <button
  //           key={category}
  //           onClick={() => setSelectedCategory(category)}
  //           className={`px-4 py-2 rounded-sm text-sm font-medium transition
  //             ${
  //               selectedCategory === category
  //                 ? "bg-primary-500 text-white"
  //                 : "bg-primary-50 hover:bg-primary-100"
  //             }`}
  //         >
  //           {category}
  //         </button>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex gap-1 items-center justify-center">
      <h1>Filter Books</h1>
      <div className="w-full m-2 rounded-sm md:w-50 md:bg-primary-900">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as BookCategory)}
          className="w-full px-4 py-2 rounded-sm text-sm font-medium bg-primary-50 hover:bg-primary-100 focus:outline-none"
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
