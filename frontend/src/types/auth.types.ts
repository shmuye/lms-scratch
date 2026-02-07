
export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
