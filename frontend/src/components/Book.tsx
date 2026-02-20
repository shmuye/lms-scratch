import React from "react";

type BookProps = {
  title: string;
  author: string;
  coverPage: string;
  description?: string;
  totalCopies: number;
  copiesAvailable: number;
};

const Book: React.FC<BookProps> = ({
  title,
  author,
  coverPage,
  description,
  totalCopies,
  copiesAvailable,
}) => {
  return (
    <div className="w-fit flex flex-col items-center">
      <div className="w-full md:w-[300px] h-[300px] bg-white shadow-md rounded-md m-2 gap-2 grid grid-cols-2 items-center">
        <img className="h-full w-full" src={coverPage} alt="book coverpage" />
        <div className="self-start p-2 space-y-1">
          <h1 className="text-xl">
            <span className="font-bold mr-2">Title</span>
            {title}
          </h1>
          <p className="text-sm">
            <span className="font-bold mr-2">author</span> {author}
          </p>
          <p>
            <span className="font-bold mr-2">description</span> {description}
          </p>
          <p>
            <span className="font-bold mr-2">total copies</span> {totalCopies}
          </p>
          <p>
            <span className="font-bold mr-2">copies Available</span>{" "}
            {copiesAvailable}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="button">Borrow Book</button>
        <button className="button">Return Book</button>
      </div>
    </div>
  );
};

export default Book;
