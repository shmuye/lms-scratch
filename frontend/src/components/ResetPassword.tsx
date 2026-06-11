import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../services/users.api";
import { showError, showSuccess } from "../utils";

type ResetPasswordInput = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [params] = useSearchParams();

  const token = params.get("token");

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ResetPasswordInput>();

  const onSubmit = async (data: ResetPasswordInput) => {
    if (data.password !== data.confirmPassword) {
      return showError("Passwords do not match");
    }

    try {
      await resetPassword(token as string, data.password);

      showSuccess("Password reset successful");

      navigate("/login");
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <div className="auth-card">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>
        <p className="text-sm text-gray-500 mt-1">Enter your new password below.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New password"
          {...register("password")}
          className="input"
        />

        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
          className="input"
        />

        <button type="submit" className="btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
