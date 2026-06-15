import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { KeyRound } from "lucide-react";
import { resetPassword } from "../services/users.api";
import { showError, showSuccess } from "../utils";
import AuthCard from "./ui/AuthCard";

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
    <AuthCard
      icon={<KeyRound size={24} />}
      title="Reset password"
      subtitle="Choose a strong new password for your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="label" htmlFor="new-password">New password</label>
          <input id="new-password" type="password" placeholder="••••••••" {...register("password")} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="confirm-password">Confirm password</label>
          <input id="confirm-password" type="password" placeholder="••••••••" {...register("confirmPassword")} className="input" />
        </div>
        <button type="submit" className="btn-primary w-full">Reset Password</button>
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
