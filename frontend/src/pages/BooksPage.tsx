import { FilterBooks } from "../components";
import Book from "../components/Book";
import Loader from "../components/Loader";
import { getBooks } from "../services/book.api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBar from "../components/SearchBar";

export type BookCategory =
  | "Fiction"
  | "Science"
  | "Technology"
  | "History"
  | "Education"
  | "Biography"
  | "Sport";

const Books = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 2000);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | "">(
    "",
  );

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books", debouncedSearch],
    queryFn: () => getBooks(debouncedSearch),
  });

  const filteredBooks = selectedCategory
    ? books?.filter((book) => book.category === selectedCategory)
    : books;

  if (isLoading) return <Loader />;

  if (error instanceof Error) {
    return (
      <div className="text-center text-danger-500 mt-10">
        Error: {error.message}
      </div>
    );
  }

  const handleSearch = () => {
    setFinalSearch(debouncedSearch);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 py-6 flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-white p-3 rounded-xl border border-primary-100 shadow-sm">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />

        <FilterBooks
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Empty State */}
      {!filteredBooks?.length && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium mb-2">No books found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      )}

      {/* Books Grid */}
      <div
        className="
            grid gap-4 sm:gap-6
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            justify-items-center"
      >
        {filteredBooks?.map((book) => (
          <Book
            key={book.isbn}
            id={book._id}
            title={book.title}
            author={book.author}
            coverPage={book.coverPage}
            description={book?.description}
            totalCopies={book.totalCopies}
            copiesAvailable={book.copiesAvailable}
            category={book.category}
            publishedYear={book.publishedYear}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
