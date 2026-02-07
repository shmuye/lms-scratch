import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/auth.api";
import { LoginInput } from "../../types/auth.types";

export const loginUser = createAsyncThunk('auth/login', async(
    data: LoginInput, { rejectWithValue }
) => {
    try {
        return await login(data)
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})