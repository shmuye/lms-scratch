import { useQuery } from "@tanstack/react-query";
import { getAllMyBorrows } from "../services/borrow.api.ts";
import Book from "./Book.tsx";
import Loader from "./Loader.tsx";

const BorrowedBooks = () => {
  const {
    data: borrowedBooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myBorrows"],
    queryFn: getAllMyBorrows,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-danger-500 py-10">
        Error loading borrowed books
      </div>
    );
  }

  if (!borrowedBooks || borrowedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">No borrowed books yet</h2>
        <p className="text-gray-500">
          You haven’t borrowed any books. Start exploring and borrow one!
        </p>
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
        xl:grid-cols-4
        justify-items-center
        "
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
