import api from "./axios";

export const borrowBook = async (id: string) => {
  try {
    const response = await api.post(`/books/${id}/borrow`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Can't borrow Book");
  }
};

export const getAllMyBorrows = async () => {
  try {
    const response = await api.get("/users/me/borrows");
    return response.data;
  } catch (error) {
    throw new Error("Can't get All book borrows");
  }
};

export const getReturnRequests = async () => {
  try {
    const response = await api.get("/books/borrows/return-requests");
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch return requests");
  }
};

export const requestReturn = async (id: string) => {
  try {
    const response = await api.post(`/books/${id}/return-request`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Can't request return");
  }
};

export const approveReturn = async (id: string) => {
  try {
    const response = await api.post(`/books/${id}/return-approve`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Can't approve return");
  }
};
