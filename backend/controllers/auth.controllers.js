import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js"
import jwt from "jsonwebtoken"
import { ACCESS_COOKIE_OPTIONS, REFRESH_COOKIE_OPTIONS } from "../config/token-options.js";

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

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
        })
        return res.status(201).json(
            {   user: {
                    id: user._id,
                    name,
                    email,
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

        const user = await User.findOne({ email }).select("+password");
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const accessToken = generateAccessToken(user._id, user.role)
        const refreshToken = generateRefreshToken(user._id)


        // hash refresh token
        user.refreshToken  = await bcrypt.hash(refreshToken, 10)
        await user.save();

        // set cookies

        res.cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS)
        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);


        return res.status(200).json(
            {   status: true,
                message: 'Login successful'
            })


    } catch(err) {
        console.log("Error signing in", err.message)
        return res.status(500).json({ message: 'Internal server error' })
    }


}

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
    if(!refreshToken) {
        return res.status(401).json({ message: 'Please log in to continue' })
    }
    let payload;
    try {
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    }catch(err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }

    const userId = payload.userId;
    const user = await User.findById( userId )
    if(!user || !user.refreshToken) {
        return res.status(401).json({ message: 'unAuthorized' })
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken)
    if(!isMatch) {
        user.refreshToken = null;
        await user.save();
        return res.status(401).json({ message: 'unAuthorized' })
    }

    // valid: rotate refresh token
    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    // set cookies
    res.cookie("accessToken", newAccessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({ message: "Token refreshed" });
   }   catch (err) {
    console.error("Error in refresh endpoint", err);
    return res.status(500).json({ message: "Internal server error" });
}


}
export const logout = async (req, res) => {
    try {
        
            const { refreshToken } = req.cookies;
            if(refreshToken) {
                try {
                    const { userId } = jwt.verify(
                        refreshToken, 
                        process.env.JWT_REFRESH_TOKEN_SECRET)

                    await User.findByIdAndUpdate(userId, {
                        refreshToken: null
                    })
                } catch(_) {
                   
                }
            }
        

        // clear cookies on client
        res.clearCookie("accessToken", ACCESS_COOKIE_OPTIONS);
        res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);

        
        return res.status(200).json({ 
               success: true, 
               message: "Logout successful" 
            });

    } catch (err) {
        console.error("Error in logout", err);
        return res.status(500).json(
            { message: "Internal server error" }
        );
    }

}