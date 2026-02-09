import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    avatar: {
        type: String, // image URL
        trim: true,
        default: null
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
        minlength: [ 8 , 'Password must be at least 8 characters'],
        select: false
    },

    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.READER
    },
    isActive: {
          type: Boolean,
          default: true
    },
    refreshToken: {
        type: String,
        default: null
    }


}, { timestamps: true })

export default mongoose.model("User", userSchema)