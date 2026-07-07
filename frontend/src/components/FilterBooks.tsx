import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { BookCategory } from "../pages/BooksPage";
import { categoryEnum } from "../types/book.types";

type FilterBookProps = {
  selectedCategory: BookCategory | "";
  setSelectedCategory: React.Dispatch<React.SetStateAction<BookCategory | "">>;
};

const FilterBooks = ({
  selectedCategory,
  setSelectedCategory,
}: FilterBookProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const filtered = categoryEnum.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative w-full min-w-0 md:w-64 lg:w-72 shrink-0" ref={ref}>
      <label className="sr-only">Filter by category</label>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="card-interactive w-full flex items-center justify-between gap-3 px-3 py-2.5"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-sm text-slate-500">Category</span>
            <span className="truncate font-medium text-slate-900">
              {selectedCategory || "All Categories"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </div>
      </button>

      {open && (
        <div className="dropdown-menu right-0 mt-2 w-full sm:w-56">
          <div className="px-2 py-2">
            <div className="input-icon-wrap">
              <Search size={16} className="text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search categories"
                className="input bg-white border-0 p-0 focus:ring-0"
              />
            </div>
          </div>

          <div className="max-h-44 overflow-y-auto px-1.5 pb-1.5">
            <button
              onClick={() => {
                setSelectedCategory("");
                setOpen(false);
                setQuery("");
              }}
              className="dropdown-item w-full justify-between"
            >
              <span>All Categories</span>
              {selectedCategory === "" && (
                <Check size={16} className="text-primary-600" />
              )}
            </button>

            {filtered.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category as BookCategory);
                  setOpen(false);
                  setQuery("");
                }}
                className="dropdown-item w-full justify-between"
              >
                <span className="truncate">{category}</span>
                {selectedCategory === category && (
                  <Check size={16} className="text-primary-600" />
                )}
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="text-sm text-slate-400 px-3 py-2">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBooks;
