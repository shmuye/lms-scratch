import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "../services/borrow.api";
import Book from "./Book.tsx";

const BorrowedBooks = () => {
  const {
    data: borrowedBooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["borrows"],
    queryFn: getAllBorrows,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-danger-500 py-10">
        Error loading borrowed books
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div
        className="grid gap-4 sm:gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4"
      >
        {borrowedBooks?.map((borrow: any) => (
          <Book
            key={borrow._id}
            id={borrow.book._id}
            title={borrow.book.title}
            author={borrow.book.author}
            coverPage={borrow.book.coverPage}
            mode="borrowed"
            description={borrow.book.description}
            totalCopies={0}
            copiesAvailable={0}
            category={borrow.book.category}
            borrowDate={borrow.borrowDate}
            dueDate={borrow.dueDate}
            status={borrow.status}
          />
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
