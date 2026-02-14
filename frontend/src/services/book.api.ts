import api from "./axios";
import { Book } from "../types/book.types";

export const createBook = async (data: Book) => {
  try {
    const response = await api.post("/books", data);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating a book, ${error}`);
  }
};

export const getBook = async () => {
  try {
    const response = await api.get("/books/:id");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching a book, ${error}`);
  }
};

export const getBooks = async (): Promise<Book[] | null> => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching books, ${error}`);
  }
};
export const updateBook = async (data: Book) => {
  try {
    const response = await api.patch("/books/:id", data);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating book, ${error}`);
  }
};

export const deleteBook = async () => {
  try {
    const response = await api.delete("/books/:id");
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting book, ${error}`);
  }
};
