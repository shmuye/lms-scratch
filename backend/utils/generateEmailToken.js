import jwt from "jsonwebtoken";

export const generateEmailToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_EMAIL_VERIFICATION_SECRET, {
    expiresIn: process.env.EMAIL_VERIFICATION_EXPIRES_IN || "1d",
  });
};
