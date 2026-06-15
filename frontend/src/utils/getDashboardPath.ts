import { User } from "../types/auth.types";

export const getDashboardPath = (role: User["role"]) => {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "LIBRARIAN":
      return "/librarian";
    default:
      return "/reader";
  }
};
