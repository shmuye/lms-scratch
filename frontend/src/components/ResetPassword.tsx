import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../services/auth.api";
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
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">Reset Password</h1>

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

        <button
          type="submit"
          className="bg-primary-600 text-white py-2 rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
