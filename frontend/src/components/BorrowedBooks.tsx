import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "../services/borrow.api";

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
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error Loading Borrowed books</div>;
  }
  return <div>{borrowedBooks?.map(() => {})}</div>;
};

export default BorrowedBooks;
