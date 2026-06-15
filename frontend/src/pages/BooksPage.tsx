import { FilterBooks } from "../components";
import Book from "../components/Book";
import Loader from "../components/Loader";
import { getBooks } from "../services/book.api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBar from "../components/SearchBar";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";

let numberOfBooks = 0;

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

  numberOfBooks = books?.length ?? 0;
  const safeBooks = Array.isArray(books) ? books : [];

  const filteredBooks = selectedCategory
    ? safeBooks?.filter((book) => book.category === selectedCategory)
    : safeBooks;

  if (isLoading) return <Loader />;

  if (error instanceof Error) {
    return (
      <PageContainer>
        <div className="empty-state text-danger-500">
          <p className="empty-state-title">Something went wrong</p>
          <p className="empty-state-text">{error.message}</p>
        </div>
      </PageContainer>
    );
  }

  const handleSearch = () => {
    setSearch(debouncedSearch);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Browse Books"
        subtitle="Discover and borrow from our collection"
      />

      <div className="toolbar">
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

      {!filteredBooks?.length && (
        <div className="empty-state">
          <p className="empty-state-title">No books found</p>
          <p className="empty-state-text">
            Try a different search or category
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.length > 0 &&
          filteredBooks.map((book) => (
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
    </PageContainer>
  );
};

export default Books;
export { numberOfBooks };
