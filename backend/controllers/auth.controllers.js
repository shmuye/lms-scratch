import {User} from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { name, role, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json(
            { message: 'Please provide all required fields' }
        )
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })
        return res.status(201).json(
            {   user: {
                   id: user._id,
                    name,
                    email,
                    role,
                },
                message: 'User created successfully'})


    } catch(err) {
        console.log("Error creating a User", err.message)
        return res.status(500).json({ message: 'Internal server error' })

    }

}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' })
    }

    try {

        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const payload = {user_id: user._id, email, role: user.role}

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        })

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        })

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 15,
        })

        return res.status(200).json(
            {   accessToken,
                refreshToken,
                message: 'Login successful'
            })


    }catch(err) {
        console.log("Error signing in", err.message)
        return res.status(500).json({ message: 'Internal server error' })
    }


}


export const logout = (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({
        success: true,
        message: 'Logout successful'
    })

}