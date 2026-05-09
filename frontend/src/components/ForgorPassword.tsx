import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { forgotPassword } from "../services/auth.api";
import { showError, showSuccess } from "../utils";

type ForgotPasswordInput = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>();

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      await forgotPassword(data.email);

      showSuccess("Password reset link sent to your email");
    } catch (error: any) {
      showError(error.message || "Failed to send reset link");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-full bg-primary-100">
          <Mail className="text-primary-600" size={24} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
            className="input"
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
