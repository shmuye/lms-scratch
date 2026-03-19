import { FilterBooks } from "../components";
import Book from "../components/Book";
import Loader from "../components/Loader";
import { getBooks } from "../services/book.api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type BookCategory =
  | "Fiction"
  | "Science"
  | "Technology"
  | "History"
  | "Education"
  | "Biography"
  | "Sport";

const Books = () => {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const [selectedCategory, setSelectedCategory] = useState<BookCategory | "">(
    "",
  );

  const filteredBooks = selectedCategory
    ? books?.filter((book) => book.category === selectedCategory)
    : books;

  if (isLoading) {
    return <Loader />;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <FilterBooks
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="w-full flex items-center justify-center flex-wrap">
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
