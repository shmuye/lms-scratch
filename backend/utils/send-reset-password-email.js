import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email, token) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL_DEV}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "Readsphere <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hi there,</p>
        <p>You have requested to reset your password. Please click the link below to reset it:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};
