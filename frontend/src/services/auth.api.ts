import { LoginInput, RegisterInput } from "../types/auth.types";
import api from "./axios";

export const register = async (data: RegisterInput) => {
    try {
        const res = await api.post('auth/register',data)
        return res.data

    } catch (error: any) {
       throw new Error(

           error?.response?.data?.message ??
           error?.message ??
           "registeration failed"

       )
    }
}

export const login = async (data: LoginInput) => {
    try {
        const res = await api.post('auth/login',data)
        return res.data

    } catch (error: any) {
       throw new Error(

           error?.response?.data?.message ??
           error?.message ??
           "Login failed"

       )
    }
}

export const logout= async () => {
    try {
        const res = await api.post('auth/logout')
        return res.data

    } catch (error: any) {
       throw new Error(

           error?.response?.data?.message ??
           error?.message ??
           "Logout failed"

       )
    }
}

export const referesh = async () => {
    try {
        const res = await api.post('auth/refresh')
        return res.data

    } catch (error: any) {
       throw new Error(

           error?.response?.data?.message ??
           error?.message ??
           "refresh failed"

       )
    }
}






