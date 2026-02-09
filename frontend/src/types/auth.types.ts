
export interface LoginInput {
  email: string;
  password: string;
}


export interface RegisterInput {

  name: string,
  email: string,
  password: string,
  
}

export interface User {

  id: string;
  name: string;
  email: string;
  role: string;

}

export interface AuthState {

  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

}
