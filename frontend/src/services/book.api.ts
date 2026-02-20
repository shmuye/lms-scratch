import api from "./axios";
import { Book } from "../types/book.types";

export const createBook = async (formdata: FormData) => {
  try {
    const response = await api.post("/books", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Backend response", error.response?.data);
    throw error.response?.data || error;
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
