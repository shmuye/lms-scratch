import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@shared/validations/auth.schema";
import { LoginInput } from "../types/auth.types.js";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import { loginUser } from "../features/auth/auth.thunks.js";
import { useNavigate, Link } from "react-router-dom";
import { selectUser } from "../features/auth/auth.slice.ts";
import { LogIn, Lock, Mail } from "lucide-react";
import { useEffect } from "react";
import { showError, showSuccess } from "../utils.ts";
import { getDashboardPath } from "../utils/getDashboardPath";
import AuthCard from "./ui/AuthCard";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    navigate(getDashboardPath(user.role), { replace: true });
  }, [user, navigate]);

  const onSubmit = async (data: LoginInput) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      showSuccess("Logged in successfully");
    } catch (error: any) {
      showError(`Failed to login: ${error?.message ?? "error logging in"}`);
    }
  };

  return (
    <AuthCard
      icon={<LogIn size={24} />}
      title="Welcome back"
      subtitle="Sign in to access your library account."
      footer={
        <p className="text-sm text-center text-slate-600">
          Don&apos;t have an account?{" "}
          <Link className="text-primary-600 font-medium hover:underline" to="/signup">
            Create account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <div>
          <label className="label" htmlFor="login-email">Email</label>
          <div className="input-icon-wrap">
            <Mail className="text-slate-400 shrink-0" size={18} aria-hidden />
            <input id="login-email" {...register("email")} type="email" className="flex-1 bg-transparent outline-none text-sm" placeholder="you@example.com" />
          </div>
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="login-password">Password</label>
          <div className="input-icon-wrap">
            <Lock className="text-slate-400 shrink-0" size={18} aria-hidden />
            <input id="login-password" {...register("password")} type="password" className="flex-1 bg-transparent outline-none text-sm" placeholder="••••••••" />
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline font-medium">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn-primary w-full">Sign In</button>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
