import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import {
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
} from "../config/token-options.js";
import { hash } from "../utils/hash.js";
import { compareHash } from "../utils/hash.js";
import { generateEmailToken } from "../utils/generateEmailToken.js";
import { sendEmailVerification } from "../utils/send-email-verification.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateEmailToken(user._id);

    user.emailVerificationToken = token;
    user.emailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    await sendEmailVerification(email, token);

    return res.status(201).json({
      user,
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    console.log("Error creating a User", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "A user with this email does not exist" });
    }
    const validPassword = await compareHash(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // if (!user.emailVerified) {
    //   return res.status(400).json({
    //     message: "Please verify your email before logging in",
    //   });
    // }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // hash refresh token
    user.refreshToken = await hash(refreshToken, 10);
    await user.save();

    // set cookies

    res.cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({
      user,
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    console.log("Error signing in", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_EMAIL_VERIFICATION_SECRET,
    );
    const userId = payload.userId;

    const user = await User.findById(userId).select(
      "+emailVerificationToken +emailVerificationTokenExpires",
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.emailVerificationToken !== token) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.emailVerificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Token has expired" });
    }
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("Error verifying email", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "Please log in to continue" });
    }
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = payload.userId;
    const user = await User.findById(userId).select("+refreshToken");
    if (!user || !user.refreshToken) {
      return res.status(401).json({ message: "unAuthorized" });
    }

    const isMatch = await compareHash(refreshToken, user.refreshToken);
    if (!isMatch) {
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({ message: "unAuthorized" });
    }

    // valid: rotate refresh token
    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = await hash(newRefreshToken);
    await user.save();

    // set cookies
    res.cookie("accessToken", newAccessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({ message: "Token refreshed" });
  } catch (err) {
    console.error("Error in refresh endpoint", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      try {
        const { userId } = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET,
        );

        await User.findByIdAndUpdate(userId, {
          refreshToken: null,
        });
      } catch (_) {}
    }

    // clear cookies on client
    res.clearCookie("accessToken", ACCESS_COOKIE_OPTIONS);
    res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Error in logout", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
