import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (email, token) => {
  try {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await resend.emails.send({
      from: "Readsphere <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email Address",
      html: `
                <p>Hi,</p>
                <p>Thank you for registering with our Readsphere! Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br/>Readsphere Team</p>
            `,
    });

    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
