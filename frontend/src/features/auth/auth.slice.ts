import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth.types";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
} from "./auth.thunks";
import { RootState } from "../../store/store";

const initialState: AuthState = {
  user: null,
  loading: false,
  bootstrapping: true,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(loginUser.pending, (state) => {
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
        state.success = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.success = false;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.bootstrapping = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.bootstrapping = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.success = false;
        state.bootstrapping = false;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;

export const isAuthenticated = (state: RootState) => !!state.auth.user;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthBootstrapping = (state: RootState) =>
  state.auth.bootstrapping;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
