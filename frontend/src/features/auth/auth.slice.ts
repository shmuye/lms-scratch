// authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginInput } from "../../types/auth.types";
import { loginUser, registerUser, logoutUser, refreshToken } from "./auth.thunks";
import { RootState } from "../../store/store";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
        state.user = null,
        state.isAuthenticated = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
            state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthState>) => {
          state.loading = false,
          state.error = null,
          state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state ,action) => {
          state.user = null,
          state.isAuthenticated = false
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginInput>) => {
        
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;

export const isAuthenticated = ((state: RootState)=> state.auth.isAuthenticated)
export const selectUser = ((state: RootState) => state.auth.user)
