import user from "../models/user.model";
import Borrow from "../models/borrow.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await user.find().select("-password");
        return  res.status(200).json(users);
    } catch (error) {
        console.log("Error fetching users", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await user.findById(id).select("-password");
        if(!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(foundUser);
    } catch (error) {
        console.log("Error fetching user by ID", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await user.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log("Error deleting user", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserBorrows = async (req, res) => {
    const { id } = req.params;
    try {
        const borrows = await Borrow.find({ user: id })
            .populate('book', 'title author isbn')
            .exec();
        return res.status(200).json(borrows);
    } catch (error) {
        console.log("Error fetching user borrows", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}       

export const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const me = await user.findById(userId).select("-password");
        if(!me) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(me);
    } catch (error) {
        console.log("Error fetching current user", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if(!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error updating profile", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}