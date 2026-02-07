import { LoginInput } from "../types/auth.types";
import api from "./axios";

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