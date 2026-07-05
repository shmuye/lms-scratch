import { useQuery } from "@tanstack/react-query";
import { getAllMyBorrows } from "../services/borrow.api.ts";
import Book from "./Book.tsx";
import Loader from "./Loader.tsx";
import { BookOpen } from "lucide-react";

const BorrowHistory = () => {
  const { data: borrows, isLoading, isError } = useQuery({
    queryKey: ["myBorrows"],
    queryFn: getAllMyBorrows,
  });

  if (isLoading) return <Loader label="Loading your borrow history..." />;

  if (isError) {
    return (
      <div className="empty-state">
        <p className="empty-state-title text-danger-600">Error loading borrow history</p>
        <p className="empty-state-text">Please try again later.</p>
      </div>
    );
  }

  const validBorrows = (borrows ?? []).filter((b: any) => b?.book);

  if (!validBorrows.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <BookOpen size={22} />
        </div>
        <p className="empty-state-title">No borrow history</p>
        <p className="empty-state-text">
          You haven't borrowed any books yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {validBorrows.map((borrow: any) => (
        <Book
          key={borrow._id}
          id={borrow.book._id}
          title={borrow.book.title}
          author={borrow.book.author}
          coverPage={borrow.book.coverPage}
          mode="history"
          description={borrow.book.description}
          totalCopies={0}
          copiesAvailable={0}
          category={borrow.book.category}
          borrowDate={borrow.borrowDate}
          dueDate={borrow.dueDate}
          returnDate={borrow.returnDate}
          status={borrow.status}
        />
      ))}
    </div>
  );
};

export default BorrowHistory;
