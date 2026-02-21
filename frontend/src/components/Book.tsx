import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import PrivilegedActions from "./PrivilegedActions.tsx"; // your dropdown card
import { useAppSelector } from "../hooks/hooks.ts";
import { selectUser } from "../features/auth/auth.slice.ts";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useAppSelector(selectUser);
  console.log(user);
  const hasAccess = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  return (
    <div className="relative w-full md:w-[300px] bg-white shadow-md rounded-lg overflow-hidden m-2 group">
      {/* Book top section */}
      <div className="relative h-[300px]">
        <img
          className="w-full h-full object-cover"
          src={coverPage}
          alt="book coverpage"
        />

        {/* Three-dot menu button */}
        {hasAccess && (
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-opacity duration-200 shadow"
          >
            <MoreVertical size={20} />
          </button>
        )}

        {/* Dropdown card */}
        <PrivilegedActions
          isOpen={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />
      </div>

      {/* Book details */}
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Author: </span>
          {author}
        </p>
        {description && (
          <p className="text-sm text-gray-600">
            <span className="font-bold">Description: </span>
            {description}
          </p>
        )}
        <p className="text-sm text-gray-600">
          <span className="font-bold">Total Copies: </span>
          {totalCopies}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Available: </span>
          {copiesAvailable}
        </p>
      </div>

      {/* Action buttons */}
      <div className="p-4 flex justify-between gap-2">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Borrow Book
        </button>
        <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
          Return Book
        </button>
      </div>
    </div>
  );
};

export default Book;
