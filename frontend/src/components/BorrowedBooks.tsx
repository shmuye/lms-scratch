import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "../services/borrow.api";
import Book from "./Book";

const BorrowedBooks = () => {
  const {
    data: borrowedBooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["borrows"],
    queryFn: getAllBorrows,
  });

  console.log(borrowedBooks);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error Loading Borrowed books</div>;
  }
  return (
    <div>
      {borrowedBooks?.map((book: any) => (
        <Book key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BorrowedBooks;
