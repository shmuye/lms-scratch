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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading borrowed books</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {borrowedBooks?.map((borrow: any) => (
        <Book
          key={borrow._id}
          id={borrow.book._id} // ✅ FIXED
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
  );
};

export default BorrowedBooks;
