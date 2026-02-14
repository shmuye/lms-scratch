import React from "react";

type BookProps = {
  title: string;
  author: string;
  coverPage: string;
};

const Book: React.FC<BookProps> = ({ title, author, coverPage }) => {
  return (
    <div className="w-[200px] h-[200px] bg-white shadow-md rounded-md m-2 flex flex-col items-center">
      <img className="h-[100px] w-full" src={coverPage} alt="book coverpage" />
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm">
        author: <span className="font-bold">{author}</span>
      </p>
    </div>
  );
};

export default Book;
