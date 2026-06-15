import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@shared/validations/auth.schema";
import { RegisterInput } from "../types/auth.types.ts";
import { useAppDispatch } from "../hooks/hooks.ts";
import { registerUser } from "../features/auth/auth.thunks.ts";
import { useNavigate, Link } from "react-router-dom";
import { showError, showSuccess } from "../utils.ts";
import { UserPlus } from "lucide-react";
import AuthCard from "./ui/AuthCard";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisterInput) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      showSuccess("Account created. Please check your email to verify.");
      navigate("/login");
    } catch (error: any) {
      showError(`Error creating account: ${error?.message ?? error}`);
    }
  };

  return (
    <AuthCard
      icon={<UserPlus size={24} />}
      title="Create your account"
      subtitle="Start building your reading habit today."
      footer={
        <p className="text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label" htmlFor="register-name">Full name</label>
          <input id="register-name" {...register("name")} placeholder="Jane Doe" className="input" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="register-email">Email</label>
          <input id="register-email" type="email" {...register("email")} placeholder="you@example.com" className="input" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="register-password">Password</label>
          <input id="register-password" type="password" {...register("password")} placeholder="••••••••" className="input" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn-primary w-full">Create Account</button>
      </form>
    </AuthCard>
  );
};

export default RegisterForm;
