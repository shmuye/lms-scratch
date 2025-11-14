import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [ true, 'Password is required'],
        minlength: [ 6, 'Password must be at least 6 characters']
    },

    role: {
        type: String,
        enum: ['Librarian', 'Reader'],
        default: 'Reader'
    }


}, { timestamps: true })

export const User = mongoose.model("User", userSchema)