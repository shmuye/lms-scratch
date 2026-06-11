import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@shared/validations/auth.schema";
import { RegisterInput } from "../types/auth.types.ts";
import { useAppDispatch } from "../hooks/hooks.ts";
import { registerUser } from "../features/auth/auth.thunks.ts";
import { useNavigate, Link } from "react-router-dom";
import { showError, showSuccess } from "../utils.ts";
import { UserPlus } from "lucide-react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisterInput) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      showSuccess(
        "Account created successfully. Please check your email to verify your account.",
      );
      navigate("/login");
    } catch (error: any) {
      showError(`Error creating account, ${error?.message ?? error}`);
    }
  };

  return (
    <div className="auth-card">
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-full bg-primary-100">
          <UserPlus className="text-primary-600" size={24} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start building your reading habit today.
          </p>
        </div>
      </div>

      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            placeholder="Full name"
            className="input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            {...register("email")}
            placeholder="Email address"
            className="input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Register
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account?
        <Link
          to="/login"
          className="text-primary-600 font-medium ml-1 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
