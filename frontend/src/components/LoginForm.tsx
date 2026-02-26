import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../shared/validations/auth.schema.js";
import { LoginInput } from "../types/auth.types.js";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import { loginUser } from "../features/auth/auth.thunks.js";
import { useNavigate, Link } from "react-router-dom";
import { selectUser } from "../features/auth/auth.slice.ts";
import { LogIn, Lock, Mail } from "lucide-react";
import { useEffect } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    navigate("/", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (data: LoginInput) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      throw new Error(`Error logging in, ${error}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-full bg-indigo-100">
          <LogIn className="text-indigo-600" size={24} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Make reading your habit. Get access to world class books.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        {/* Email */}
        <div className="flex flex-col gap-1">
          <div
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2
                      focus-within:ring-2 focus-within:ring-indigo-500
                      focus-within:border-indigo-500 transition"
          >
            <Mail className="text-gray-400" size={18} />
            <input
              {...register("email")}
              type="email"
              className="flex-1 bg-transparent outline-none text-gray-900
                     placeholder:text-gray-400
                     autofill:bg-transparent"
              placeholder="Email"
            />
          </div>

          {errors.email && (
            <p className="text-center text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2
                      focus-within:ring-2 focus-within:ring-indigo-500
                      focus-within:border-indigo-500 transition"
          >
            <Lock className="text-gray-400" size={18} />
            <input
              {...register("password")}
              type="password"
              className="flex-1 bg-transparent outline-none text-gray-900
                     placeholder:text-gray-400"
              placeholder="Password"
            />
          </div>

          {errors.password && (
            <p className="text-center text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-indigo-600
                 text-white font-medium
                 hover:bg-indigo-700
                 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                 transition"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?
        <Link
          className="text-indigo-600 font-medium ml-1 hover:underline"
          to="/signup"
        >
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
