import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { forgotPassword } from "../services/users.api";
import { showError, showSuccess } from "../utils";
import AuthCard from "./ui/AuthCard";

type ForgotPasswordInput = { email: string };

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>();

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      await forgotPassword(data.email);
      showSuccess("Password reset link sent to your email");
    } catch (error: any) {
      showError(error.message || "Failed to send reset link");
    }
  };

  return (
    <AuthCard
      icon={<Mail size={24} />}
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="label" htmlFor="forgot-email">Email</label>
          <input id="forgot-email" type="email" placeholder="you@example.com" {...register("email", { required: "Email is required" })} className="input" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <button type="submit" className="btn-primary w-full">Send Reset Link</button>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;
