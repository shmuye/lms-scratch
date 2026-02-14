import Book from "../components/Book";
import { getBooks } from "../services/book.api";
import { useQuery } from "@tanstack/react-query";
import Hero from "../components/Hero";
import { useState } from "react";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  // console.log(books);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   throw new Error(`Error fetching books, ${error}`);
  // }

  return (
    <>
      {/* {books?.map((book) => (
        <Book
          key={book.isbn}
          title={book.title}
          author={book.author}
          coverPage={book.coverPage}
        />
      ))} */}

      <Hero />
    </>
  );
};

export default HomePage;
