export const categoryEnum = [
  "Fiction",
  "Science",
  "Technology",
  "History",
  "Education",
  "Biography",
  "Sport",
] as const;

export type Category = (typeof categoryEnum)[number];
export interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  rating: number;
  isbn: string;
  category: Category;
  coverPage: string;
  publishedYear?: number;
  totalCopies: number;
  copiesAvailable: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}
