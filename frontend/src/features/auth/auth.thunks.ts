import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoginInput, RegisterInput } from "../../types/auth.types";
import { login, logout, refresh, register } from "../../services/auth.api";


export const registerUser = createAsyncThunk('auth/register', async (data: RegisterInput, { rejectWithValue}) => {
    try {
        return await register(data)
        
    } catch (error: any) {
        
        return rejectWithValue(error.message)
    }
})

export const loginUser = createAsyncThunk('auth/login', async(
    data: LoginInput, { rejectWithValue }
) => {
    try {
        return await login(data)
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

export const logoutUser = createAsyncThunk('/auth/logout', async(
    _, {rejectWithValue}) => {
        try {
            return await logout()
        } catch (error: any) {
            
            return rejectWithValue(error.message)
        }
})

export const refreshToken = createAsyncThunk(`/auth/refresh`, async (
    _, { rejectWithValue }) => {
      
            try {
                return await refresh()
            } catch (error: any) {
                return rejectWithValue(error.message)
            }
       
    })