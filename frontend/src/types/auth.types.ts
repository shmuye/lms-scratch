export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "READER" | "LIBRARIAN";
  avatar: string;
  isActive: boolean;
}
export interface AuthResponse {
  user: User;
  message: string;
  success: boolean;
}
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
