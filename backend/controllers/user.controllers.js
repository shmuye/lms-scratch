import User from "../models/user.model.js";
import Borrow from "../models/borrow.model.js";
import { ROLES } from "../constants/roles.js";
import { hash } from "../utils/hash.js";
import { generateResetPasswordToken } from "../utils/generateTokens.js";
import { sendResetPasswordEmail } from "../utils/send-reset-password-email.js";

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (![ROLES.LIBRARIAN, ROLES.ADMIN].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await hash(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log("Error creating user by admin", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(foundUser);
  } catch (error) {
    console.log("Error fetching user by ID", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error deleting user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deactivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    console.log("Error deactivating user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.log("Error activating user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserBorrows = async (req, res) => {
  const userId = req.user.id;
  try {
    const borrows = await Borrow.find({
      user: userId,
      status: ["Borrowed", "Return Requested", "Overdue"],
    })
      .populate("book", "coverPage description title author isbn category")
      .exec();
    return res.status(200).json(borrows);
  } catch (error) {
    console.log("Error fetching user borrows", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const me = await User.findById(userId);
    if (!me) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(me);
  } catch (error) {
    console.log("Error fetching current user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error updating profile", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Avatar image is required",
    });
  }

  const avatarPath = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;
  const userId = req.user.id;

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarPath },
    { new: true },
  );

  return res.status(201).json({
    message: "avatar updated successfully",
    avatar: user.avatar,
  });
};

export const deleteAvatar = async (req, res) => {
  try {
    const deletedAvatar = await User.findByIdAndUpdate(req.user.id, {
      avatar: null,
    });

    if (!deleteAvatar) {
      return res.status(400).json({
        message: "Avatar not found",
      });
    }

    return res.status(200).json({
      message: "Avatar deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "+passwordResetToken +passwordResetTokenExpires",
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "A user with this email does not exist" });
    }

    const token = generateResetPasswordToken(user._id);

    user.passwordResetToken = token;
    user.passwordResetTokenExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset password email
    await sendResetPasswordEmail(user.email, token);

    return res
      .status(200)
      .json({ message: "Reset password link sent to your email" });
  } catch (error) {
    console.log("Error in forgotPassword", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const payload = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);

    const user = await User.findById(payload.userId).select(
      "+passwordResetToken +passwordResetTokenExpires",
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    if (user.passwordResetToken !== token) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    if (user.passwordResetTokenExpires < Date.now()) {
      return res.status(400).json({
        message: "Token expired",
      });
    }

    user.password = await hash(password);

    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log("Error deleting account", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
