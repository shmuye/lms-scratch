// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/auth.types";
import { loginUser, registerUser, logoutUser } from "./auth.thunks";
import { RootState } from "../../store/store";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;

export const isAuthenticated = (state: RootState) => !!state.auth.user;
export const selectUser = (state: RootState) => state.auth.user;
