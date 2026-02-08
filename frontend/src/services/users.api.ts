import { User } from "../types/user.types";
import api from "./axios";

export const userByAdmin = async (data: User) => {
    try {

        const response = await api.post('/users', data)
        return response.data

    } catch (error) {
        throw new Error(`Error creating user: ${error}`)
    }
}

export const getUsers = async () =>  {
    try {

        const response = await api.get('/users')
        return response.data

    } catch (error) {
        throw new Error(`Error fetching users, ${error})`)
    }
}

export const getUser = async () => {
    
    try {

        const response = await api.get('/users/:id') 
        return response.data

    } catch (error) {
        throw new Error(`Error fetching a user, ${error}`)
    }
}

export const getUserBorrows = async () => {
    try {

        const response = await api.get('/users/me/borrows')
        return response.data
        
    } catch (error) {
        throw new Error(`Error fetching  your borrows,  ${error})`)
    }
}

export const getProfileInfo = async () => {
    try {

        const response = await api.get('/users/me')
        return response.data

    } catch (error) {
       throw new Error(`Error fetching your profile information, ${error}`)
    }
}

export const updateProfileInfo = async (data: User) => {
    try {

        const response = await api.patch('/user/me', data)
        return response.data

    } catch (error) {
        throw new Error(`Error updating your profile information, ${error}`)
    }
}

// to be checked if it works
export const updateAvatar = async (avatar: URL) => {
    try {

        const response = await api.patch('/user/me/avatar', avatar)
        return response.data

    } catch (error) {
        throw new Error(`Error updating avatar, ${error}`)
    }
}

export const deleteUser = async () => {
    try {

        const response = await api.delete('/users/:id')
        return response.data

    } catch (error) {

        throw new Error(`Error deleting user, ${error}`)
    }
}

export const deleteAvatar = async () => {
    try {

        const response = await api.delete('/users/me/avatar')
        return response.data

    } catch (error) {
        throw new Error(`Error deleting avatar, ${error}`)
    }
}